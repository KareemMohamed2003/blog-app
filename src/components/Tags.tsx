import TagIcon from "./svg/TagIcon";
import TagsIcon from "./svg/TagsIcon";
import Tag from "./Tag";

export default function Tags() {
   return (<section className="bg-[#0e144e63] rounded-xl w-84 shadow-2xl h-96 w-[22rem]" >
      <div className="flex w-full  mt-10">
         <div className="w-12 h-12 m-3">
            <TagsIcon />
         </div>
         <h1 className="text-3xl m-3">Tags</h1>
      </div>

      <div className="grid gap-1 grid-cols-2 grid-rows-2">

         <div className="w-40">
            <Tag />
         </div>
         <div className="w-40">
            <Tag />
         </div>
         <div className="w-40">
            <Tag />
         </div>

      </div>

   </section>)
}