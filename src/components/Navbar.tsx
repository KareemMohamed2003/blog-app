import Image from "next/image";
import MyBlogsIcon from "./svg/MyBlogsIcon";
import PostsIcon from "./svg/PostsIcon";
import SearchIcon from "./svg/SearchIcon";
import SignOutIcon from "./svg/SignOutIcon";
import Link from "next/dist/client/link";
import { useUser } from '@auth0/nextjs-auth0/client'
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "./ContextProvider";
import { urlForImg } from "@/sanity";
import SearchList from "./SearchList";
import { useRouter } from "next/router"
import SpinnerLoader from "./SpinnerLoader";
import FullProfile from "./FullProfile";
import NoUserImg from "./svg/NoUserImg";
import Profile from "./Profile";
import ProfileNoImg from "./ProfileNoImg";
export default function Navbar(): any {

   const appContext: any = useContext(Context);
   const [searchInput, setSearchInput] = useState<string | null>(null);
   const [searchListDisplay, setSearchListDisplay] = useState<boolean>(false);
   const [displayProfile, setProfileDisplay] = useState<any>();
   const { user, isLoading } = useUser();
   const router = useRouter();
   // i added this line to the code base 

   useEffect(() => {

      if (!user && !isLoading) {

         router.push("/LoginPage");

      }
   }, [user, isLoading])

   return (

      <Fragment>

         {user &&

            <nav className="flex  justify-around items-center  top-0 z-10 h-30 w-full relative"  >

               <div className="relative" onClick={() => setSearchListDisplay(!searchListDisplay)}>

                  <form className="flex items-center relative z-100" >

                     <input onChange={(e) => {
                        e.preventDefault()
                        setSearchInput(e.target.value)
                        setSearchListDisplay(true)

                     }} type="text" placeholder="search..." className=" rounded-xl text-xl h-10 bg-[#40499eda] shadow-xl placeholder:relative placeholder:left-4 max-w-[15rem] max-[700px]:text-sm max-[600px]:text-xs max-[550px]:text-xs  max-xxsm-[450px]:w-24 max-xxsm-[450px]:h-8" />
                     {/* <div className="relative w-12 p-2 max-[750px]:w-8" >

            <SearchIcon />
         </div> */}

                  </form>

                  {
                     searchInput && searchListDisplay &&
                     <SearchList
                        setSearchListDisplay={setSearchListDisplay}
                        searchInput={searchInput} />
                  }
               </div>

               <Link href="/MyBlogs">
                  <section className="relative nav-item  item ">
                     <div className="flex flex-col  items-center   justify-center  transition-all">

                        <div className="flex relative items-center">
                           <div className="w-10 h-10 mr-3 max-[900px]:w-6 max-[900px]:h-6 max-[550px]:h-4 max-[550px]:w-4 max-[550px]:mr-1">
                              <MyBlogsIcon />
                           </div>
                           <p className="text-2xl text-[#9C9292] max-[900px]:text-xl max-[780px]:text-sm">
                              my posts
                           </p>
                        </div>

                     </div>
                     <span className="scalable"></span>
                  </section>

               </Link>

               <Link href="/PostsPage">

                  <section className="h-12 flex flex-col items-center justify-center nav-item  max-[900px]:h-0">
                     <div className="flex relative  items-center">
                        <div className="w-10 h-10 mr-3 max-[900px]:w-6 max-[900px]:h-6  max-[550px]:h-4 max-[550px]:w-4  max-[550px]:mr-1">
                           <PostsIcon />
                        </div>
                        <p className="text-2xl text-[#9C9292] max-[900px]:text-xl max-[780px]:text-sm" >
                           posts
                        </p>
                     </div>
                     <span className="scalable">
                     </span>
                  </section>

               </Link>

               <Link href="/api/auth/logout" >
                  <section className="h-12 flex flex-col  items-center  justify-center  nav-item  max-[900px]:h-0 " >
                     <div className="flex relative  items-center">
                        <div className="w-10 h-10 justify-center   mr-3 max-[900px]:w-6 max-[900px]:h-6  max-[550px]:h-4 max-[550px]:w-4 max-[550px]:mr-1">
                           <SignOutIcon />
                        </div>
                        <p className="text-2xl text-[#9C9292] hover:text-white transition-all max-[900px]:text-xl max-[780px]:text-sm">
                           logout
                        </p>
                     </div>

                     <span className="scalable">
                     </span>
                  </section>
               </Link>

               {appContext?.user?.profilePic ? <div onPointerOver={() => setProfileDisplay(true)} className="flex m-1 relative flex-col items-center justify-evenly shrink-0">

                  <Profile imageSrc={appContext?.user.profilePic.asset._ref} />

                  {
                     appContext.user && displayProfile &&
                     <div onClick={() => setProfileDisplay(!displayProfile)} className="h-24 w-48  profile absolute flex self-center right-0   top-[5.5rem] max-[750px]:top-[4rem] max-[550px]:top-[2.5rem] transition-all " >
                        <FullProfile
                           setProfileDisplay={setProfileDisplay}
                           username={user.nickname}
                           imageSrc={appContext?.user?.profilePic?.asset._ref} />

                     </div>

                  }
               </div>
                  :
                  <Fragment>
                     <div onPointerOver={() => setProfileDisplay(true)} className="flex  relative flex-col items-center justify-evenly shrink-0">

                        <ProfileNoImg />

                     </div>


                     {
                        appContext.user && displayProfile &&
                        <div onClick={() => setProfileDisplay(!displayProfile)} className="h-20 w-48  profile absolute flex self-center right-0   top-[5.5rem] max-[750px]:top-[4rem] max-[550px]:top-[3.5rem] transition-all " >
                           <FullProfile
                              setProfileDisplay={setProfileDisplay}
                              username={user.nickname}
                              imageSrc={appContext?.user?.profilePic?.asset._ref} />

                        </div>

                     }
                  </Fragment>
               }

            </nav>

         }

         {isLoading && <div className="mt-12"><SpinnerLoader /></div>}


      </Fragment>

   )
}