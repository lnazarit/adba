import './globals.css'
import ProviderLocale from "./ProviderLocale";
import {DM_Sans} from '@next/font/google'
// import {notFound} from 'next/navigation';
// import { ClerkProvider } from '@clerk/nextjs'

const dmSans = DM_Sans({
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
        <body className={dmSans.className}>
          <ProviderLocale>
            {children}
          </ProviderLocale>
        </body>
      </html>
  );
}