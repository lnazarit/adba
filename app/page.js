"use client"
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import FormCreateItem from "@/components/FormCreateItem";
import Item from '@/components/Item';
import { useFetch } from '@/services/useFetch';
import CategoryList from '@/components/CategoryList';
import Pagination from '@/components/Pagination';
import EmptyView from '@/components/EmptyView';
import Search from '@/components/Search';
import { ITEMS_API } from '@/app/constants/constants';
import FilterDone from '@/components/FilterDone';
import FilterRate from '@/components/FilterRate';

export default function Home() {

  const [refresh, setRefresh] = useState(true);
  const [category, setCategory] = useState(null);
  const [paramsUrl, setParamsUrl] = useState(new Map());
  const {data, loading, error} = useFetch(ITEMS_API, paramsUrl, refresh);
  const t = useTranslations();

  const loadItems = () => {
    setRefresh((prev) => !prev);
  }

  return (
      <main style={{margin: '0 auto', width: '50%', padding: '4rem 0'}}>
        <h1>{t('main_title')}</h1>
        <h3 className="mb-4">{t('items')} {data?.meta.total_items}:</h3>
        <div className='mb-4 flex items-end'>
          <CategoryList
            showAll
            label={'Category'}
            callback={(category) => {
              setCategory(category)
              const map = new Map(paramsUrl)
              if(category) map.set('category', category.id)
              else map.delete('category')
              setParamsUrl(map)
            }
          }
          />
          <div className='ml-2'>
            <FilterDone callback={(key) => {
              const map = new Map(paramsUrl)
              if(key !== 'all') map.set('done', key)
              else map.delete('done')
              setParamsUrl(map)
            }} />
          </div>
          <div className='ml-2'>
            <FilterRate callback={(key) => {
              const map = new Map(paramsUrl)
              if(key !== 'all') map.set('priority', key)
              else map.delete('priority')
              setParamsUrl(map)
            }} />
          </div>
          <Search
            callback={(key) => {
              const map = new Map(paramsUrl)
              if(key !== '') map.set('search', key)
              else map.delete('search')
              setParamsUrl(map)
            }}
          />
        </div>

        {loading && <p>{t('loading')} ....</p>}
        {error && <p>{t('error_loading')}</p>}
        {data?.items?.length === 0 && <EmptyView category={category?.name} />}
        {data?.items?.length > 0 && data.items.map(item => {
          return <Item
            {...item}
            key={item.id}
            className="mb-4"
            reloadList={() => loadItems()}
          />
        })}
        {data && (
        <Pagination
          callback={page => {setParamsUrl({...paramsUrl, page})}}
          meta={data.meta} />
        )}
        <hr className="mb-4" />
        <FormCreateItem reloadList={() => loadItems()} />
      </main>
  );
};