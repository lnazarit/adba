import './globals.css'
import ProviderLocale from "./ProviderLocale";
import {Montserrat} from '@next/font/google'
// import {notFound} from 'next/navigation';
// import { ClerkProvider } from '@clerk/nextjs'

const monse = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700']
});


export const metadata = {
  title: 'Registro de bienes materiales adquiridos y por adquirir',
  description: 'Simple todo list app',
}

export default function RootLayout({children}) {
  return (
      <html className="dark" lang="en">
        <body className={monse.className}>
          <ProviderLocale>
            {children}
          </ProviderLocale>
        </body>
      </html>
  );
}