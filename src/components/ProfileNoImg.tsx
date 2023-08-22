import NoUserImg from "./svg/NoUserImg";

export default function ProfileNoImg() {
   return (
      <div className="shrink-0 relative h-16 m-4  w-16 flex items-center justify-center  rounded-[50%]  max-[550px]:w-8  max-[550px]:h-8 max-[550px]:mr-1 max-[750px]:h-12  max-[750px]:w-12 max-[550px]:ml-1 bg-slate-400">
       <div className= "flex absolute self-center justify-center  h-[60%]  w-[60%]">
       <NoUserImg />
       </div>
      
      </div>
   )
}