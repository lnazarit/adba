"use client"
import {useState, useEffect} from 'react';
import {NextUIProvider} from "@nextui-org/react";
import ItemCategory from '@/components/ItemCategory';
import FormCreateCategory from '@/components/FormCreateCategory';
import { useFetch } from '@/services/useFetch';

const URL = 'http://localhost:8080/api/categories'


// eslint-disable-next-line @next/next/no-async-client-component
export default function Categories() {
  const [refresh, setRefresh] = useState(true);
  const {data: categories, loading, error} = useFetch(URL, refresh);

  const loadCategories = () => {
    setRefresh((prev) => !prev);
  }

  return (
    <NextUIProvider>
      <main>
        <h3>Categorias {categories?.length}:</h3>
        {loading && <p>Loading ....</p>}
        {error && 'Hubo un error al cargar las categorias'}
        {categories?.map(category => {
          return <ItemCategory
            key={category.id}
            id={category.id}
            name={category.name}
            slug={category.slug}
            className="mb-4"
            reloadList={async () => loadCategories()}
          />
        })}
        <hr className="mb-4" />
        <FormCreateCategory reloadList={() => loadCategories()} />
      </main>
    </NextUIProvider>
  )
}
