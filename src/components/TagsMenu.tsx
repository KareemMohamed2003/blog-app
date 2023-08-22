import Tag from "./Tag";

export default function TagsMenu(){
   return <section className="flex flex-col  shrink-0 h-72 w-48 bg-[#8d48e123]  shadow-2xl items-center rounded-xl scrol">
<div className="w-40 m-3">
<Tag/>
</div>
<div className="w-40 m-3">
<Tag/>
</div>
<div className="w-40 m-3">
<Tag/>
</div>
<div className="w-40 m-3">
<Tag/>
</div>
   </section>
}