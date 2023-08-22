import Image from "next/image";
import { urlForImg } from "@/sanity";
export default function Profile({ imageSrc }: any) {
   return (
      <div className="shrink-0 relative h-20  self-center w-20 rounded-[50%] max-[650px]:w-12  max-[650px]:h-12  max-[550px]:w-8  max-[550px]:h-8 max-[550px]:mr-1 max-[750px]:h-16  max-[750px]:w-16 max-[550px]:ml-1">
         <Image src={urlForImg(imageSrc).auto("format").url()} fill className="object-cover 	rounded-[50%]" alt="" />

      </div>
   )
}