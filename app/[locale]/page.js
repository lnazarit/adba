"use client"
import {useState} from 'react';
import FormCreateItem from "@/components/FormCreateItem";
import Item from '@/components/Item';
import { useFetch } from '@/services/useFetch';
import { NextUIProvider } from '@nextui-org/react';
import CategoryList from '@/components/CategoryList';
import {useTranslations} from 'next-intl';
import Pagination from '@/components/Pagination';
import EmptyView from '@/components/EmptyView';
import Search from '@/components/Search';

const URL = 'http://localhost:8080/api/items'


// eslint-disable-next-line @next/next/no-async-client-component
export default function Home() {
  const [refresh, setRefresh] = useState(true);
  const [category, setCategory] = useState(null);
  const [url, setUrl] = useState(URL);
  const {data, loading, error} = useFetch(url, refresh);
  const t = useTranslations();


  const loadItems = (id) => {
    setRefresh((prev) => !prev);
  }

  return (
    <NextUIProvider>
      <main style={{margin: '0 auto', width: '50%', padding: '4rem 0'}}>
        <h1>{t('main_title')}</h1>
        <h3 className="mb-4">{t('items')} {data?.meta.total_items}:</h3>
        <div className='mb-4 flex'>
          <CategoryList showAll callback={(category) => {
            setCategory(category)
            setUrl(category ? `${URL}?category=${category.id}` : URL)}
          }/>
          <Search
            callback={(search) => setUrl(search !== '' ? `${URL}?search=${search}` : URL)}
          />
        </div>

        {loading && <p>{t('loading')} ....</p>}
        {error && <p>{t('error_loading')}</p>}
        {data?.items?.length === 0 && <EmptyView category={category?.name} />}
        {data?.items?.length > 0 && data.items.map(item => {
          return <Item
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            done={item.done}
            className="mb-4"
            reloadList={async () => loadItems()}
          />
        })}
        {data && (
        <Pagination
          callback={page => {
            setUrl(`${URL}?page=${page}`)
            loadItems();
          }}
          meta={data.meta} />
        )}
        <hr className="mb-4" />
        <FormCreateItem reloadList={() => loadItems()} />
      </main>
    </NextUIProvider>
  )
}
