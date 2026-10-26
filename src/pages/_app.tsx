import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Montserrat, Cormorant_Garamond, Bebas_Neue, Playfair_Display } from 'next/font/google'
import CustomCursor from '@/components/common/CustomCursor'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: '400',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://studio-adult.hardbanrecordslab.online').replace(/\/$/, '')

// Keeps <html lang> in step with client-side language switches and tells search engines
// that every page exists in both languages.
function LocaleMeta() {
  const { asPath, locale, locales = [], defaultLocale } = useRouter()
  useEffect(() => {
    if (locale) document.documentElement.lang = locale
  }, [locale])
  const path = asPath.split(/[?#]/)[0].replace(/\/$/, '')
  const href = (locale: string) => `${SITE_URL}${locale === defaultLocale ? '' : `/${locale}`}${path}`

  return (
    <Head>
      {locales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={href(locale)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={href(defaultLocale as string)} />
    </Head>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleMeta />
      <div className={`${montserrat.variable} ${cormorant.variable} ${bebas.variable} ${playfair.variable} font-sans`}>
        <CustomCursor />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
