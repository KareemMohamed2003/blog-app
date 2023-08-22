import Image from "next/image";
import { ISearchResult } from "@/interfaces";
import { urlForImg } from "@/sanity";
export default function SearchResult({title,authorImg,author,postImage}:ISearchResult) {

   return (

      <div className="rounded-xl  bg-[#7879F1] flex justify-evenly flex-col w-80 h-28 m-5">
         <section className="flex justify-between items-center w-full p-1">
            <div className="h-16 w-16 relative self-center" >

               <Image className="rounded-[50%]   absolute" quality={100} src={urlForImg(authorImg).url()} fill alt="" />
           
            </div>
           
            <p className="text-l m-2">
               {/* author name */}

               {author}
            
            </p>


            <div className="h-16 w-28 relative">
              { postImage &&<Image className="rounded-[15%] absolute" src={urlForImg(postImage).url()} quality={100} fill alt="" />}

            </div>

        
         </section>
         <h1 className="text-xl m-1">{ title.length<20?title:title.substring(0, 30) + "..."}</h1>
      </div>

   )

}