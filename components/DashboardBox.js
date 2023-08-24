"use client";
import React, {useState} from "react";
import { ITEMS_API } from "@/app/constants/constants";
import { useFetch } from "@/services/useFetch";
import { useTranslations } from "next-intl";
import {IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle} from 'react-icons/io';

export default function DashboardBox({category}) {
  const t = useTranslations();
  const {data, loading, error} = useFetch(`${ITEMS_API}?category=${category.id.toString()}&per_page=20`);
  if(loading) {
    return (
      <div style={{borderRadius: '4px', padding: '1rem'}} className="border overflow-hidden">
        <h3 className="mb-4">{category.name}</h3>
        <p>Loading box</p>
      </div>
    )
  }
  if(data.items.length === 0) {
    return (
      <div style={{borderRadius: '4px', padding: '1rem'}} className="border overflow-hidden">
        <h3 className="mb-4">{category.name}</h3>
        <p>{t('commons.no_results')}</p>
      </div>
    )
  }
  return (
    <div style={{borderRadius: '4px', padding: '1rem'}} className="border overflow-hidden">
    <h3 className="mb-4">{category.name}</h3>
    {data.items.map(e => {
      return (
        <div className="mb-3 border-b pb-3 flex" key={e.id}>
          <div className="mr-4">
            {e.done ? <IoIosCheckmarkCircle style={{fill: 'green'}} /> : <IoIosCheckmarkCircleOutline />}
          </div>
          <div className="flex-1">
            <h3 style={{lineHeight: 1}}>{e.title}</h3>
            <small style={{opacity: '.6'}} className="description">{e.content}</small>
          </div>
        </div>
      )}
    )}
  </div>
  )
}
