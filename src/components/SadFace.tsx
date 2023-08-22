import SadFaceIcon from "./svg/SadFaceIcon"
export default function SadFace(){

   return (
      <section className="flex flex-col  items-center justify-evenly h-full">
      <div className="h-64 w-64 self-center mt-20 max-[700px]:w-52">
         <SadFaceIcon />
      </div>
      <h1 className="text-3xl mt-10 max-[700px]:text-2xl">you haven't posted yet</h1>
   
   </section>
   )

}