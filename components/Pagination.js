"use client";
import { useState } from "react";
import {Button} from "@nextui-org/react";
import {useTranslations} from 'next-intl';

export default function Pagination({meta, callback}) {
  const t = useTranslations();
  if(meta.total <= meta.per_page) return null;
  const countPages = meta.total / meta.per_page;
  const arrayPages = [];
  for (let i = 0; i < countPages; i++) {
    arrayPages.push(i + 1);
  }

  return (
    <div className="pagination mb-4">
      <Button
        isDisabled={meta.page === 1}
        size="sm"
        onClick={() => callback(meta.page - 1)}
        >
          {t('commons.back')}
        </Button>
      {arrayPages.map(e => {
        return (
        <Button
          onClick={() => callback(e)}
          isDisabled={e === meta.page}
          className="btn-tiny"
          size="sm"
          key={e}
        >
          {e}
        </Button>
        )
      })}
      <Button
        isDisabled={meta.page === arrayPages.length}
        size="sm"
        onClick={() => callback(meta.page + 1)}
      >
        {t('commons.next')}
      </Button>

    </div>
  )
}
