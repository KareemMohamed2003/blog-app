import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  const { user, isLoading } = useUser()
  // returns a boolean indicating   if the nextJs-auth0 SDK has finished loading 
  // if the sdk finishes loading and the user object is undefined then there is no logged users 
  // 
  const router = useRouter()

  // console.log(user)

  useEffect(() => {
    // console.log("use Effect ran");
    // console.log("index page loaded")
    if (user?.name) {

      console.log(user?.name)
      router.push("/PostsPage")

    }

    else if (!isLoading && !user) {
      // if the nextJs-auth0 SDK finishes loading and the user is undefined redirect 
      // to the loginPage
      router.push("/LoginPage")
      // console.log("user object is undefined")
    }
    if (user) router.push("/PostsPage");
  }, [user])



  return (

    <>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </>
  )

}
