"use client"
import {useEffect, useState} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import { useLang } from './hooks';
import Loading from '@/components/Loading';
import { NextUIProvider } from '@nextui-org/react';
import ChangeLang from '@/components/ChangeLang';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProviderLocale({children}) {
  const [locale, setLocale] = useState(window.localStorage.getItem('locale') || 'en');
  const {messages} = useLang(locale);
  useEffect(() => {
    window.toast = toast;
  }, [])
  if(!messages) return <div className='grid-loading'><Loading showText /></div>
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NextUIProvider>
        <ToastContainer theme="dark" />
        <div style={{margin: '0 auto', width: '50%', padding: '.5rem 0'}}>
          <ChangeLang locale={locale} callback={lo => setLocale(lo)} />
        </div>
        {children}
      </NextUIProvider>
    </NextIntlClientProvider>
  )
};