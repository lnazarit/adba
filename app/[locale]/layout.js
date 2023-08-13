import './globals.css'
import { Inter } from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl';
// import {notFound} from 'next/navigation';
// import { ClerkProvider } from '@clerk/nextjs'

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}];
}


const inter = Inter({ subsets: ['latin'] })

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
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
