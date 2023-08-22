import Author from "./Author";
import Image from "next/image";
import { IBlogPost } from "@/interfaces";
import { urlForImg } from "@/sanity";
import NoImage from "./svg/NoImageIcon";

export default function BlogPost({ body, title, postImg, tags, author, authorImg, publishedAt }: IBlogPost) {
   
   return (

      <main className="flex flex-col items-center shadow-xl rounded-xl  m-30 w-[33rem] bg-[#0e144e63] max-lg:max-w-min max-h-[31rem] max-[550px]:w-[21rem] "   >
       
         <section className="flex flex-wrap justify-around items-center  w-full ">
            <div className="h-52 w-full relative rounded-xl flex items-center justify-center">

               {postImg ? <Image src={postImg && urlForImg(postImg).url()} className="rounded-xl object-cover" fill alt="" /> :
                  <section className="flex flex-col w-full items-center absolute justify-between">
                     <div className="h-32 w-32 flex flex-col">
                        <NoImage />
                     </div>
                     <p className="block text-center w-fill text-xl">
                        no image avaliable
                     </p>

                  </section>

               }
            </div>
         
         </section>

         <Author authorImg={authorImg} author={author} publishedAt={publishedAt} />

         <div className="m-4">
            <h1 className="text-2xl text-center mb-4 max-[550px]:text-xl">{title && title?.length < 35 ? title : title?.substring(0, 28) + "..."} </h1>
            <p>
               {body && body?.length < 68 ? body : body?.substring(0, 50) + "..."}
            </p>
         </div>

      </main>

   )

}