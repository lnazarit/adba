import './globals.css'

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
          {children}
      </body>
    </html>
  );
}