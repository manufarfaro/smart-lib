import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import AppHeader from '../components/AppHeader';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <div className='h-full'>
        <AppHeader />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}
