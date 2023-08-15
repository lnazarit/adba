"use client"
import {useEffect, useState} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import { useLang } from './hooks';
import Loading from '@/components/Loading';
import ChangeLang from '@/components/ChangeLang';
import { ItemsHome } from './ItemsHome';

const styles = {
  placeItems: 'center',
  height: '100vh'
}

export default function Home() {
  const [locale, setLocale] = useState('en');
  const {messages} = useLang(locale);
  useEffect(() => {
    setLocale(window.localStorage.getItem('locale') || 'en')
  }, [])
  if(!messages) return <div className='grid' style={styles}><Loading showText /></div>
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ChangeLang locale={locale} callback={lo => setLocale(lo)} />
      <ItemsHome />
    </NextIntlClientProvider>
  )
}
