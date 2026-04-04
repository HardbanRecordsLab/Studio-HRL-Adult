import '@/styles/globals.css'
import type { AppProps } from 'next/app'
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${montserrat.variable} ${cormorant.variable} ${bebas.variable} ${playfair.variable} font-sans`}>
        <CustomCursor />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
