'use client'

import { Button, ButtonGroup } from "@nextui-org/button"
export default function ChangeLang({locale, callback}) {
  return (
    <ButtonGroup>
      {['en', 'es'].map(e => (
      <Button key={e} variant={locale === e ? 'light' : 'solid'} onClick={() => {
        localStorage?.setItem('locale', e);
        callback(e)
      }}>{e}</Button>))}
    </ButtonGroup>
  )
}