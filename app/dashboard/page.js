"use client"

import {useTranslations} from 'next-intl';
import { CATEGORIES_API } from '@/app/constants/constants';
import { useFetch } from '@/services/useFetch';
import DashboardBox from '@/components/DashboardBox';


export default function Home() {
  const t = useTranslations();
  const {data, loading, error} = useFetch(CATEGORIES_API)
  if(loading) return <p>Loading categories</p>
  return (
    <main style={{margin: '0 auto', width: '50%', padding: '4rem 0'}}>
      <h1>{t('commons.dashboard')}</h1>
      <div className='grid-dashboard'>
        {data.map(e => {
          return <DashboardBox category={e} key={e.id} />
        })}
      </div>
    </main>
  );
};
