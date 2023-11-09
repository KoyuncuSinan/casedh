import './globals.css'
import Head from 'next/head'

export const metadata = {
  title: 'Sinan Koyuncu - DHIS2 Test Case',
  description: 'DHIS2 Test Case by Sinan Koyuncu',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
