"use client"
import {useState, useEffect, useCallback} from 'react';
import { Input } from "@nextui-org/react";
import { useDebounce } from "@/app/hooks";
import {useTranslations} from 'next-intl';

export default function Search({callback}) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 300);

  const cb = useCallback(callback, [callback]);

  useEffect(() => {
    cb(debounceSearch);
  }, [debounceSearch, cb]);

  return (
    <div className="search ml-2">
      <Input placeholder={t('commons.search') + "..."} onChange={({target}) => {
          setSearchTerm(target.value);
        }} />
    </div>
  );
}