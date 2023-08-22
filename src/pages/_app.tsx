import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from "@auth0/nextjs-auth0/client"
import ContextProvider from '@/components/ContextProvider'
export default function App({ Component, pageProps }: AppProps) {
  // console.log(UserProvider)

  return (
    <UserProvider>
      <ContextProvider>
        {/* check if a  user is signed in or not if yes then display user credentials  */}
        <div id='portal'></div>
        <Navbar />
        <Component {...pageProps} />
      </ContextProvider>
    </UserProvider>
  )

}
