import JavascriptIcon from "./svg/JavascriptIcon";
// interface 
//  svgicon, tag Name
export default function Tag() {
   // we need to create a switch to display the tag icon based on the user choice .  
   /// remember to add a userEffect to avoid an infinite loop with setState()
   return (<div className="flex bg-[#6c66667e] rounded-2xl items-center h-10 ml-1 max-[550px]:w-32 max-[550px]:h-8">

      <p className="ml-3 text-base max-[550px]:text-[0.7rem]">
         javascript
      </p>
      <div className="m-4 h-8 w-8 max-[550px]:h-4  max-[550px]:w-4 ">
         <JavascriptIcon />
      </div>
   </div>)
}