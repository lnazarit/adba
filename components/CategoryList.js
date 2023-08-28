"use client";

import { useFetch } from "@/services/useFetch";
import { CATEGORIES_API } from '@/app/constants/constants';
import DropdownSelect from './DropdownSelect';
import { useTranslations } from "next-intl";

export default function CategoryList({callback, showAll = false, label, selected}) {
  const t = useTranslations();
  const obj = {name: 'All', slug: 'all', id: 0, key: 'all'}
  const {data, loading, error} = useFetch(CATEGORIES_API)

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>

  const parseMap = data.map(e => ({...e, key: e.slug}))

  const parseSelected = () => {
    return parseMap?.find(e => e.id === selected)?.slug;
  }

  return (
    <DropdownSelect
      label={label}
      selected={parseSelected()}
      placeholder={!showAll ? t('category.select_category') : null}
      callback={(item) => {
        callback(item)
      }}
      items={showAll ? [obj,...parseMap] : parseMap}
    />
  )
}
