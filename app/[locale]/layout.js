import '../globals.css'
import {NextIntlClientProvider} from 'next-intl';
import Head from 'next/head';
// import {notFound} from 'next/navigation';
// import { ClerkProvider } from '@clerk/nextjs'

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}];
}

export const metadata = {
  title: 'Registro de bienes materiales adquiridos y por adquirir',
  description: 'Simple todo list app',
}

export default async function RootLayout({children, params: {locale}}) {
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.log(error);
  }

  return (
    <html lang={locale}>
      <body className="dark">
        <Head>
            <style>

            </style>
        </Head>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}