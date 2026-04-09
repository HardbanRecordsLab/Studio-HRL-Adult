import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#080808" />
        <meta name="description" content="Studio HRL Adult - Premium creator profiles" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
