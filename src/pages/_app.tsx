import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <NextUIProvider>
          <Head>
            <title>Ryan Nguyen</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="shortcut icon" href="/pics/favicon.JPG"/>
          </Head>
          <Component {...pageProps}/>
        </NextUIProvider>
      </SessionProvider>
      <Analytics/>
    </>
  )
}