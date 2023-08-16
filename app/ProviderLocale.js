"use client"
import {useEffect, useState} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import { useLang } from './hooks';
import Loading from '@/components/Loading';
import { NextUIProvider } from '@nextui-org/react';
import ChangeLang from '@/components/ChangeLang';

export default function ProviderLocale({children}) {
  const [locale, setLocale] = useState('en');
  const {messages} = useLang(locale);
  useEffect(() => {
    setLocale(window.localStorage.getItem('locale') || 'en')
  }, [])
  if(!messages) return <div className='grid-loading'><Loading showText /></div>
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NextUIProvider>
        <ChangeLang locale={locale} callback={lo => setLocale(lo)} />
        {children}
      </NextUIProvider>
    </NextIntlClientProvider>
  )
};