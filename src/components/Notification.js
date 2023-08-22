import { useEffect } from "react";
import { useReducer } from "react"
import SpinnerLoader from "./SpinnerLoader";
import SuccessIcon from "./svg/SuccessIcon"
import ErrorIcon from "./svg/ErrorIcon"
import DeleteIcon from "./svg/DeleteIcon";
export default function Notification({ type, message }) {
   const styleReducer = (state, action) => {
      switch (action.type) {
         case "create account":

            return {

               text: "creating account...",
               style: "create",
               icon: <SpinnerLoader />

            }
            break;
         case "sign up error":

            return {

               text: "something went wrong",
               style: "error",
               icon: <ErrorIcon />,
               iconStyle: "h-24 w-24",
               message: action.message
            }

         case "add account":
            return {

               text: "account created",
               style: "add",
               iconStyle: "h-24 w-24",
               icon: <SuccessIcon />
            }
            break;

         case "awaiting publishing":

            return {

               text: "publishing changes...",
               style: "create",
               iconStyle: "h-24 w-24",
               icon: <SpinnerLoader />
            };

         case "publishing succeeded":

            return {

               text: "post published",
               style: "add",
               iconStyle: "h-24 w-24",
               icon: <SuccessIcon />
            };
         case "publishing failed":

            return {

               text: "opps something went wrong",
               style: "error",
               iconStyle: "h-24 w-24",
               icon: <ErrorIcon />,

            };

         case "creating post":
            return {

               iconStyle: " self",
               text: "creating post...",
               style: "create",
               icon: <SpinnerLoader />
            
            };

         case "post created":

            return {

               iconStyle: "h-24 w-24",
               text: "post created",
               style: "add",
               icon: <SuccessIcon />
            };

         case "post creation failed":

            return {

               text: "something went wrong...",
               style: "error",
               iconStyle: "h-24 w-24",
               icon: <ErrorIcon />,
            };
         case "deleting post":
            return {


               text: "deleting post...",
               style: "error",
               iconStyle: "h-24 w-24",
               icon: <DeleteIcon />,
            };
         case "post deleted":
            return {


               text: "post deleted",
               style: "",
               iconStyle: "h-24 w-24",
               icon: <SuccessIcon />,
            };
         case "reset":
            return intialState

         default:
            break;
      }

   }


   const intialState = { style: null, icon: null, text: null }
 
   const [styles, dispatch] = useReducer(styleReducer,intialState)

   useEffect(() => {
      switch (type) {
         case "create account":
            dispatch({ type: "create account" })
            break;

         case "sign up error":
            dispatch({ type: "sign up error" })
            break;

         case "add account":
            dispatch({ type: "add account" })
            break;

         case "awaiting publishing":
            dispatch({ type: "awaiting publishing" })
            break;
         case "publishing succeeded":
            // publishing succeeded
            dispatch({ type: "publishing succeeded" })
            break;
         case "publishing failed":
            dispatch({ type: "publishing failed" })
            break;

         case "post created":
            dispatch({ type: "post created" })
            break;
         case "creating post":
            dispatch({ type: "creating post" })
            break;

         case "post creation failed":
            dispatch({ type: "post creation failed" })
            break;
         case "deleting post":
            dispatch({ type: "deleting post" })
            break;
         default:
            break;

      }

   }, [type])

   return (

      <div className={styles.style}>
         <div className={styles.iconStyle}>
            {styles.icon}
         </div>
         {message ? <h1 className="text-3xl">{message}</h1>
            : <h1 className="text-3xl">{styles.text}</h1>}

      </div>




   )
}