"use client"
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import FormCreateItem from "@/components/FormCreateItem";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import Item from '@/components/Item';
import { useFetch } from '@/services/useFetch';
import CategoryList from '@/components/CategoryList';
import Pagination from '@/components/Pagination';
import EmptyView from '@/components/EmptyView';
import Search from '@/components/Search';
import { ITEMS_API } from '@/app/constants/constants';

export default function Home() {

  const [refresh, setRefresh] = useState(true);
  const [category, setCategory] = useState(null);
  const [done, setDone] = useState(null);
  const [paramsUrl, setParamsUrl] = useState(null);
  const {data, loading, error} = useFetch(ITEMS_API, paramsUrl, refresh);
  const t = useTranslations();

  const loadItems = () => {
    setRefresh((prev) => !prev);
  }

  return (
      <main style={{margin: '0 auto', width: '50%', padding: '4rem 0'}}>
        <h1>{t('main_title')}</h1>
        <h3 className="mb-4">{t('items')} {data?.meta.total_items}:</h3>
        <div className='mb-4 flex'>
          <CategoryList
            showAll
            callback={(category) => {
              setCategory(category)
              const obj = {...paramsUrl}
              if(category) obj.category = category.id;
              else delete obj.category;
              setParamsUrl({...obj})
            }
          }
          />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Done</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onAction={(key) => {
                setDone(key)
                const obj = {...paramsUrl}
                if(done) obj.done = key;
                setParamsUrl({...obj})
              }}
            >
              <DropdownItem key="1">Done</DropdownItem>
              <DropdownItem key="0">Not done</DropdownItem>
              <DropdownItem key="all">All</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Search
            callback={(search) => setParamsUrl({...paramsUrl, search})}
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