import './globals.css'
import {NextIntlClientProvider} from 'next-intl';
// import {notFound} from 'next/navigation';
// import { ClerkProvider } from '@clerk/nextjs'
import { Playfair_Display, Roboto } from 'next/font/google'

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}];
}

const playfair = Playfair_Display({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Registro de bienes materiales adquiridos y por adquirir',
  description: 'Simple todo list app',
}

export default async function LocaleLayout({children, params: {locale}}) {
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.log(error);
  }

  return (
    <html lang={locale}>
       <style global>{`
        html {
          font-family: ${playfair.style.fontFamily};
        }
      `}</style>
      <body className="dark">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
