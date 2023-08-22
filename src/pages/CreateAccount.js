import Image from 'next/image';
import { useRef, useState, useReducer } from 'react';
import { getAllUsers, getAuth0AccessToken, createAccount } from "../auth0";
import { useEffect } from "react";
import { createSanityDocument, fetchDocuments, addImageToDocument } from "../sanity"
import { useRouter } from 'next/router';
import { disableNotification } from '../functions';
import { readFile } from '../functions';
import ClientPortal from "../components/ClientPortal.tsx"
import Notification from '../components/Notification';
const specialChars = ['@', '#', "$", "^", "+", "-", "*", "=", "?", "<>", ",", "!", "&", '|']

let fileElement;

if (typeof window !== 'undefined') {

   fileElement = document.getElementById("file")

}

const displayFileReader = (e) => {
   e.preventDefault()
   if (fileElement) { fileElement.click() }
   else {
      fileElement = document.getElementById("file")
   }
}

const errorReducer = (state, action) => {

   switch (action.type) {
      case "checkPassword":
         if (action.value.length < 8) {
            return {
               ...state, passwordError: "password must be 8 characters"
            }
         }

         else if (action.value.length == 0) {
            return {
               ...state, passwordError: "password field is required"
            }
         }

         else if (action.value.split("").some(char => char === specialChars.find(specialChar => char.includes(specialChar))) == false) {
            return {
               ...state, passwordError: "password must be include special characters characters"
            }
         }

         else if (!action.value.split("").some(val => val === val.toUpperCase())) {
            return {
               ...state, passwordError: "password must be container upperCase letters"
            }
         }

         else {
            return {
               ...state, passwordError: null, password: action.value
            }
         }

         break;
      case "checkEmail":
         if (!action.value.includes("@")) {
            return {
               ...state, emailError: "email address must included @"
            }

         }

         if (!action.value.includes(".com")) {
            return {
               ...state, emailError: "email address is not valid"
            }
         }

         else {
            return {
               ...state, emailError: null, email: action.value
            }
         }

         break;

      case "checkUsername":
         if (action.value === "") {
            return {
               ...state, usernameError: "username field required",
            }
         }

         else {
            return {
               ...state, usernameError: null, username: action.value,
            }
         }

      case "other":
         return {
            ...state, other: action.value
         }
         break;
      case "checkAccountAvailablity":
         if (action.value == "sign up error") {
            return {
               ...state, isAccountAvailable: false
            }
         }
         else {
            return {
               ...state, isAccountAvailable: true
            }
         }
   }

}

export default function CreateAccount() {

   const initialFormState = {
      emailError: "",
      passwordError: "",
      userNameError: "",
      email: null,
      password: null,
      username: null,
      isAccountAvailable: null
   }

   const [authToken, setAuthToken] = useState(null);
   const [authUsers, setAuthUsers] = useState(null)
   const [authorsDocuments, setDocuments] = useState(null);
   const [notificationDisplay, setNotification] = useState({ type: null, display: false, message: null })
   const [errorState, dispatch] = useReducer(errorReducer, initialFormState);
   const [imageUrl, setImageUrl] = useState(null)
   const [imageFile, setImageFile] = useState(null)
   const router = useRouter();
   const emailRef = useRef()
   const passwordRef = useRef()
   const usernameRef = useRef();
   const submit = (e) => {
      e.preventDefault()
      let email = emailRef.current.value
      dispatch({ type: "checkEmail", value: email })
      let password = passwordRef.current.value
      dispatch({ type: "checkPassword", value: password })
      let userName = usernameRef.current.value
      dispatch({ type: "checkUsername", value: userName })

      if (email !== "" && password !== "" && userName !== "") {

         setNotification({ type: "create account", display: true })
         createAccount(email, password, userName, setNotification, dispatch)
         // console.log(errorState)
         getAuth0AccessToken(setAuthToken)

      }
   }

   useEffect(() => {

      if (authToken !== null && authToken?.length > 0) {
         // console.log("auth condition satsified")
         // if authToken is the opposite of null which is truthy  getAllUser()
         getAllUsers(authToken).then(value => setAuthUsers(value))
      }

   }, [authToken])

   useEffect(() => {

      // if authUsers array is empty 
      if (authUsers && authUsers.length > 0 && errorState.isAccountAvailable) {
         const newUser = authUsers.find(el => el.email === errorState.email)
         //check if the new user is present if that's the case get the id else refetch users 
         newUser ? createSanityDocument("author", { author_id: newUser.user_id, authorName: newUser.nickname, email: errorState.email }) : getAllUsers(authToken).then(val => setAuthUsers(val));
         fetchDocuments("author", setDocuments);

      }

      else {
         // console.log("auth users condition is not met ");
      }

   }, [authUsers, authToken, errorState.isAccountAvailable])

   useEffect(() => {
      if (authorsDocuments && errorState.isAccountAvailable) {
         // find document               

         const newUser = authUsers.find(el => el.email === errorState.email);

         const authorDoc = newUser && authorsDocuments.find(el => el.author_id === newUser.user_id)


         if (authorDoc && imageFile) {
            // we also need to check that the new users is not already created if that the case we need to 
            addImageToDocument(authorDoc._id, imageFile, "profilePic")

            setNotification({ type: "add account", display: true })

            emailRef.current.value = ""
            passwordRef.current.value = ""
            usernameRef.current.value = ""

            setImageFile(null)
            setImageUrl(null)
            setAuthToken(null)
            setAuthUsers([])
            setDocuments([])
            setTimeout(() => {
               disableNotification(setNotification)
            }, 1900)

            setTimeout(() => { router.push("/LoginPage") }, 3000)

         }
         else if (authorDoc && !imageFile) {


            setNotification({ type: "add account", display: true })

            emailRef.current.value = ""
            passwordRef.current.value = ""
            usernameRef.current.value = ""
            setAuthToken(null)
            setAuthUsers([])
            setDocuments([])
            setTimeout(() => {
               disableNotification(setNotification)
            }, 1900)

            setTimeout(() => { router.push("/LoginPage") }, 3000)
         }
         else {
            // console.log("else is executed")
            fetchDocuments("author", setDocuments)
         }

      }

      else {
         // console.log("none of the conditions are statisfied");
      }

   }, [authorsDocuments, authUsers])

   return (
      <>
         {
            notificationDisplay.display && <ClientPortal selector="#portal">
               <Notification
                  message={notificationDisplay.message && notificationDisplay.message}
                  type={notificationDisplay.type} />

            </ClientPortal>
         }
         <main className="flex justify-around bg-[#575faa] h-full min-h-screen  max-[550px]:items-center  max-[550px]:justify-center max-[900px]:flex-col">
            <section className="h-full flex flex-col items-center">

               <div className="flex flex-col justify-evenly m-8">
                  <h1 className="self-start	 text-6xl max-[550px]:text-3xl max-[900px]:text-4xl">Create account</h1>
               </div>
               {errorState && errorState.other && <p className="text-xl text-[#e24949] self-start justify-start">
                  {errorState.other}
               </p>}

               <form className="flex flex-col justify-evenly  h-full m-4 w-3/4 items-center max-[600px]:justify-center" onSubmit={submit}>
                  {/* <p className="text-xl text-[#e24949] self-start">invalid email address</p> */}
                  {errorState && errorState.usernameError && <p className="text-xl text-[#e24949] self-start">{errorState.usernameError}</p>}

                  <div className="relative m-4 w-full max-[600px]:w-[17rem]">
                     <input ref={usernameRef} type="text" placeholder=" " className="rounded-xl   w-full  text-2xl bg-[#0d0b0b34] h-16  max-[550px]:text-xl max-[550px]:w-[17rem]" />
                     <span className="fake-placeholder max-[550px]:text-lg">username</span>
                  </div>

                  {errorState && errorState.emailError && <p className="text-xl text-[#e24949] self-start">{errorState.emailError}</p>}
                  <div className="relative m-4 w-full max-[600px]:w-[17rem]">

                     <input ref={emailRef} type="text" placeholder=" " className="rounded-xl w-full  text-2xl bg-[#0d0b0b34] h-16  max-[550px]:text-xl max-[550px]:w-[17rem]" />
                     <span className="fake-placeholder max-[550px]:text-lg">email</span>
                  </div>
                  {errorState && errorState.passwordError && <p className="text-xl text-[#e24949] self-start justify-start"> {errorState.passwordError}</p>}
                  <div className="relative m-4 w-full max-[600px]:w-[17rem]">

                     <input ref={passwordRef} placeholder=" " type="password" className="rounded-xl  w-full text-2xl bg-[#0d0b0b34] h-16 max-[550px]:text-xl max-[550px]:w-[17rem]" />
                     <span className="fake-placeholder max-[550px]:text-lg">password</span>
                  </div>
                  <button className="text-3xl p-3.5	w-full shrink-0 bg-[#0095ffb0] rounded-xl max-[550px]:text-xl m-4 max-[550px]:w-[17rem]">
                     sign up
                  </button>

                  <button onClick={(e) => displayFileReader(e)}
                     className="text-3xl p-3.5	w-full shrink-0 bg-[#b700e5d7] rounded-xl max-[550px]:text-xl m-4 max-[550px]:w-[17rem]">
                     choose image
                  </button>
                  <input type="file" id="file" className="file-element" style={{ display: "none" }} accept="image/*" onChange={e => readFile(e, setImageUrl, setImageFile)} />

               </form>
            </section>
            <div className="relative flex items-center self-center  m-4">
               {imageUrl &&
                  <div className="h-full w-full">
                     <Image height="300" width="300" alt="" className="rounded-2xl object-cover" src={imageUrl} />

                  </div>
               }
            </div>

         </main>
      </>
   )
}
