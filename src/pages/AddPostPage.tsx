import { useRef, useState, useEffect, useContext } from "react"
import { dateFormatter, readFile, isPostCreated } from "@/functions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { addImageToDocument, addPostToAuthorList, createSanityDocument, client as sanityClient } from "../sanity";
import { Context } from "@/components/ContextProvider";
import { INotification } from "@/interfaces";
import Image from "next/image";
import PublishIcon from "@/components/svg/PublishIcon";
import AddImageIcon from "@/components/svg/AddImageIcon";
import ClientPortal from "../components/ClientPortal"
import Notification from '../components/Notification';


export default function AddPostPage() {

   const { user: authUser } = useUser();
   const { user, setUser, setPosts }: any = useContext(Context);
   const [imageUrl, setImageUrl] = useState<any>(null)
   const [imageFile, setImageFile] = useState<any>(null)
   const [imageAsset, setImageAsset] = useState<any>(null);
   const titleRef = useRef<HTMLInputElement>(null);
   const textArea = useRef<HTMLTextAreaElement>(null);
   const [notificationDisplay, setNotification] = useState<INotification>({ type: null, display: false, message: null })
   const [postData, setPostData] = useState<any>();
   const [createdPost, setCreatedPost] = useState<any>({ postDoc: null, authorPost: null });

   const createPost = (e: any) => {

      e.preventDefault()
 
      let titleVal = titleRef?.current!.value;

      let bodyVal = textArea?.current!.value;
      if (titleVal !== "" && bodyVal !== "") {
         setNotification({ type: "creating post", display: true })
         const postDoc = {

            title: titleVal,
            publishedAt: dateFormatter.format(new Date()),
            body: bodyVal,
            author: authUser?.nickname,
            authorImg: { ...user?.profilePic }  //  image asset 

         };

         setPostData(postDoc);
         titleRef.current!.value = ""
         textArea.current!.value = ""
         createSanityDocument("post", postDoc, setPostData, setCreatedPost)

      }

   }

   useEffect(() => {

      if (postData?.document_id && imageFile && createdPost.postDoc) {
       
         // check of the document_id exists before adding  Image
         // console.log(postData.document_id)

         addImageToDocument(postData.document_id, imageFile, "postImg", setImageAsset)

         // console.log("doc condition ran")
         setImageFile(null)

      }

      if (imageAsset && user && createdPost.postDoc && postData) {

         // console.log("first condition ran")
         setImageUrl(null);
         setPostData(null);
         setImageFile(null);
         addPostToAuthorList(user._id, imageAsset, postData, setCreatedPost);
         setImageAsset(null);


      }

      else if (postData && user && createdPost.postDoc && !imageFile) {

         // console.log("third coniditon")
         addPostToAuthorList(user._id, null, postData, setCreatedPost);
         setPostData(null)

      }
      if (createdPost.postDoc && createdPost.authorPost) {
         // console.log("last condition ran")
         isPostCreated(createdPost, authUser?.sub, setUser, setPosts, setNotification, setCreatedPost)
      }

      // make sure that the post  document is created  first before hand 

   }, [postData, imageAsset, createdPost])

   let fileElement: any;

   if (typeof window !== 'undefined') {
      fileElement = document.getElementById("file")
   }

   const displayFileReader = () => {
      if (fileElement) fileElement?.click()

      else {
         fileElement = document.getElementById("file");
      }

   }


   return (
      <main className="flex flex-col items-center   home-bg" >

         {notificationDisplay.display &&
            <ClientPortal selector="#portal">
               <Notification
                  message={notificationDisplay.message}
                  type={notificationDisplay.type} />
            </ClientPortal>
         }


         {
            imageUrl &&
            <div className="flex relative items-center mt-10 max-h-[45rem] h-[35rem] w-11/12">
               {imageUrl !== null &&
                  <Image fill unoptimized={false} alt="" className="rounded-2xl justify-center relative m-auto object-cover" src={imageUrl} />}
            </div>
         }
   
         <form onSubmit={createPost} className="flex flex-col items-center">
            <section className="flex items-center justify-between w-[35rem] mt-10 mb-3  max-[700px]:w-[33rem] max-[550px]:w-[21.1rem]">

               <input required ref={titleRef} type="text" placeholder="title..." className=" shrink-0 h-16   bg-[#111b7144] text-2xl shadow-2xl w-[27rem] rounded-2xl max-[700px]:w-50 max-[550px]:w-64 max-[550px]:text-lg" />
               <input type="file" id="file" className="file-element" style={{ display: "none" }} accept="image/*" onChange={e => {
                  e.preventDefault()
                  readFile(e, setImageUrl, setImageFile)
               }} />


               <button type="button" onClick={() => displayFileReader()} className="h-16 w-20  shrink-0  flex items-center justify-center rounded-xl bg-[#111b7144] shadow-xl ">
                  <div className="h-12 w-12">
                     <AddImageIcon />
                  </div>
               </button>

            </section>

            <textarea required ref={textArea} cols={40} className="shrink-0 m-4 h-[30rem] bg-[#111b7144] shadow-2xl text-2xl rounded-lg outline-none max-[700px]:w-54 max-[550px]:w-[20rem] max-[550px]:text-xl" ></textarea>

            <button type="submit" className="flex shrink-0 items-center w-40 h-16 rounded-xl bg-[#10ffb779] p-1 m-5">

               <p className="text-2xl">publish</p>

               <div className="w-12  ml-4 self-center">
                  <PublishIcon />
               </div>

            </button>
         </form>

      </main>
   )
}


