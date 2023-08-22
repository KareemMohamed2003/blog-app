import { urlForImg } from "@/sanity"
import Image from "next/image"
import ProfileNoImg from "./ProfileNoImg"
export default function FullProfile({ username, imageSrc, setProfileDisplay }: any) {

   return (

      <section className="h-full w-auto min-w-full absolute right-0  bg-[#0e0b0b3d]  rounded-2xl backdrop-blur-[30px]  items-center justify-around flex transition-all  max-[750px]:right-0">

         {imageSrc ? <div className="shrink-0 h-20 w-20 relative z-10 m-2  max-[550px]:mr-1  max-[550px]:ml-1">

            <Image alt="" fill
               src={urlForImg(imageSrc).auto("format").url()}
               className="object-cover	rounded-[50%] " />
         </div>
            : <ProfileNoImg />
         }
         <section className="flex flex-col ">
            <div className="self-end mr-4 hover:cursor-pointer" onClick={() => { setProfileDisplay(false) }}>
               <p className="text-3xl">
                  &#10006;
               </p>
            </div>

            <h1 className="text-xl m-2">
               {username}
               {/* johnnnyy */}

            </h1>

         </section>

         {/* <div className="profile-blur"></div> */}
      </section>

   )
}