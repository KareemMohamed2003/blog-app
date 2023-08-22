import spinnerLoader from "../styles/loader.module.css"
// import  "../styles/loader.css";
export default function SpinnerLoader() {
  return (
    <div className={spinnerLoader["lds-spinner"]}>
      <div></div>
      <div>
        </div><div></div><div></div>
        <div></div><div></div><div></div><div></div><div>
          </div><div></div><div></div><div></div>
    </div>


  )
}