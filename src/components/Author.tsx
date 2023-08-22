import DateIcon from "./svg/DateIcon";
import Image from "next/image";
import { IAuthor } from "@/interfaces";
import { urlForImg } from "../sanity";

export default function Author({ author, authorImg, publishedAt }: IAuthor) {

   return (
      <section className="flex  flex-col  justify-evenly  w-full  mt-5 mb-2  max-[500px]:flex-col max-[500px]:justify-center items-start">
         <div className="flex justify-between items-center w-full max-[500px]:w-auto max-[500px]:mb-4">
            <div className="relative h-[5.4rem] w-[5.4rem] shrink-0 max-[550px]:h-16  max-[550px]:w-16 max-[450px]:h-12  max-[450px]:w-12 ">

               {authorImg && <Image fill src={urlForImg(authorImg)?.url()} className="rounded-[50%] ml-4 object-fill " alt="" />}
            </div>

            <p className="ml-6 text-xl justify-start w-full text-start max-[500px]:text-lg">{author.length<23 ?author:author?.substring(0,15)+"..."}</p>
         </div>

         {publishedAt && <div className="flex bg-[#ffffff36] p-2 rounded-2xl shrink-0  items-center ml-4 mt-4">
            <DateIcon />
            {publishedAt && <p className="ml-4 text-xl max-[600px]:text-lg">

               {publishedAt}
            </p>
            }
         </div>
         }
      </section>
   )
}