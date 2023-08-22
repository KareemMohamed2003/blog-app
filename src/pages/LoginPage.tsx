// import auth0 from "auth0-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth0AccessToken, getAllUsers } from "../auth0"
import { useRouter } from 'next/router'
import { useUser } from "@auth0/nextjs-auth0/client";
import SpinnerLoader from "@/components/SpinnerLoader";

export default function LoginPage() {

   const [token, setAuth0Token] = useState<any>()
   const [isComponentLoading, setComponentLoading] = useState<any>(false)
   const { user } = useUser()
   const router = useRouter()

   useEffect(() => {

      getAuth0AccessToken(setAuth0Token)
      if (user?.name) {
         
         router.push("/PostsPage")
         setComponentLoading(true)
      }

      // i've added the user object from useUser as a dependency it wasn't
      // there before and the app was working great.
   }, [user])



   useEffect(() => {

      // console.log("user Effect ran")
      if (token) {

         getAllUsers(token)
         return;
      }
   }, [token])




   return (
      !isComponentLoading ? < section className=" flex flex-col justify-evenly items-start  bg-[#575faa] h-full min-h-screen shrink-0 max-[700px]:items-center max-[600px]:justify-center" >
         <div className="flex flex-col justify-evenly h-1/3">
            <h1 className="m-16 text-8xl max-[700px]:text-7xl  max-[700px]:m-0   max-[700px]:mb-16 ">Login</h1>
         </div>

         <div className="ml-8 flex flex-col h-full justify-between shrink-0 max-[550px]:m-0">
            <a href={"/api/auth/login"}>
               <button className="w-96 text-3xl p-3.5 bg-[#0095ffb0] rounded-xl shrink-0 mb-16 max-[550px]:w-[16.5rem]">
                  sign in
               </button>
            </a>

            <Link className="" href="/CreateAccount">
               <button className="mt-4 w-96 text-3xl p-3.5 bg-[#f5a345c5] rounded-xl max-[550px]:w-[16.5rem]">
                  create account
               </button>
            </Link>
         </div>

      </section >
         : <div className="self-center justify-center mt-15"><SpinnerLoader /></div>

   )
}

 