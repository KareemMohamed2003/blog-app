import { useEffect ,useRef,useState} from "react";
import { createPortal } from "react-dom";
export default function Portal({children,selector}:any){
const ref =useRef<any>()

const [mounted, setMounted] = useState(false)


  useEffect(() => {
    const portalEl=document.querySelector(selector)
   ref.current = portalEl
   portalEl.classList.add("portal-blur")
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(
  <div className="absolute left-0 right-0 self-center flex items-center justify-center h-full  z-[100]  backdrop-blur-xl w-full">{children}</div>, ref!.current) : null
}

