"use client";
import {useState, useEffect} from 'react';
import { useFetch } from "@/services/useFetch";
import { CATEGORIES_API } from '@/app/constants/constants';
import DropdownSelect from './DropdownSelect';

export default function CategoryList({callback, showAll = false, label}) {
  const obj = {name: 'All', slug: 'all', id: 0, key: 'all'}
  const {data, loading, error} = useFetch(CATEGORIES_API)


  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>

  const parseMap = data.map(e => ({...e, key: e.slug}))

  return (
    <DropdownSelect
      label={label}
      callback={(item) => callback(parseMap.find(e => e.key === item))}
      items={showAll ? [obj,...parseMap] : parseMap}
    />
  )
}
