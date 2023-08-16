import './globals.css'
import ProviderLocale from "./ProviderLocale";
// import {notFound} from 'next/navigation';
// import { ClerkProvider } from '@clerk/nextjs'


export const metadata = {
  title: 'Registro de bienes materiales adquiridos y por adquirir',
  description: 'Simple todo list app',
}

export default function RootLayout({children}) {
  return (
      <html className="dark" lang="en">
        <body>
          <ProviderLocale>
            {children}
          </ProviderLocale>
        </body>
      </html>
  );
}