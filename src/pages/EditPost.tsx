
import Image from "next/image";
import { useState, useRef, useEffect, useContext } from "react";
import { Context } from "@/components/ContextProvider";
import {
   checkAssetsReferences, urlForImg, deleteAsset, addImageToDocument,
   updateDocument, updateAuthorPost, fetchPost
} from "@/sanity";
import ClientPortal from "../components/ClientPortal"
import Notification from '../components/Notification';
import { INotification, IUpdatedPost } from "@/interfaces";
import { updatePosts } from "@/functions";
import { GetServerSidePropsContext } from "next";
import { useUser } from "@auth0/nextjs-auth0/client";
import NoImage from "@/components/NoImage";
export default function EditPost({ post, postIndex }: any) {

   const [imageAsset, setImageAsset] = useState<any>(null);
   const [imageUrl, setImageUrl] = useState<any>(null);
   const [imageFile, setImageFile] = useState<any>(null);
   const [originalPost, setOriginalPost] = useState<any>(); // original post  in case  the user wanted to discard the changes made to the post 
   const [editedPost, setEditedPost] = useState<any>(false);  //  edited post
   const [isEdited, setIsEdited] = useState<any>(false);
   const [isChangesConfirmed, setConfirmation] = useState<boolean>(false)
   const [imageReference, setImageReference] = useState<any>({ isDocReferenced: null, docReference: null, isPostReferenced: null, postReference: null }); // stores the reference object that is the result of checking 
   const [notificationDisplay, setNotification] = useState<INotification>({ type: null, display: false, message: null })
   const [updatedPost, setUpdatedPost] = useState<IUpdatedPost>({ post: null })
   const { user, setUser, setPosts }: any = useContext(Context);

   const currentAuthenticatedUser = useUser()
   const authUserId = currentAuthenticatedUser.user?.sub;

   let titleRef = useRef<HTMLInputElement>(null);

   let textAreaRef = useRef<HTMLTextAreaElement>(null);

   const publishChanges = (imageFile: any) => {

      if (imageFile && imageUrl) {

         addImageToDocument(originalPost.document_id, imageFile, "postImg", setImageAsset) // this function can also update the post document 

      }

      const updatedFields = {
         title: editedPost.title,
         body: editedPost.body,
      }

      //  get  document_id from the selected userBlogPost item in the AuthorPosts Array  . 
      updateDocument(originalPost.document_id, updatedFields)
      setConfirmation(true)
      setIsEdited(false)
      // disable waiting overlay , display a sucess message to the user 

   }

   let fileElement: any;

   if (typeof window !== 'undefined') {

      fileElement = document.getElementById("file");
   }

   const readFile = (e: any) => {

      if (e.target.files[0]) {

         setImageFile(e.target.files[0]);
         setImageUrl(URL.createObjectURL(e.target.files[0]));

      }

   }


   const displayFileReader = () => {

      if (fileElement) fileElement?.click();

      else {
         fileElement = document.getElementById("file");
      }

   }


   useEffect(() => {

      // author_doc_id (author document id) is stored for  us  to be able to make changes in the author post in the document       

      setOriginalPost({ author_doc_id: user?._id, ...post }); // original post without any changes  , 
      setEditedPost({ author_doc_id: user?._id, ...post });


   }, [user])


   useEffect(() => {
      // when we recieve the image asset from sanity  update the post document ,  update the author List item ,      


      let newPostFields = {
         ...post,
         title: editedPost.title,
         body: editedPost.body,
      }

      if (originalPost?.title !== editedPost?.title || originalPost?.body !== editedPost?.body || imageUrl) {
         // check that there has been changes made to the post 
         setIsEdited(true)
      }

      if (imageAsset) {
         // if there is an image asset meaning the user have changed the image 
         // console.log(imageAsset)

         const old_asset = originalPost?.postImg?.asset._ref // old image asset reference 
         // console.log("this is the old asset   ", old_asset)

         old_asset && checkAssetsReferences(old_asset, setImageReference)

         newPostFields.postImg = {
            _type: 'image',
            asset: {
               _type: "reference",
               _ref: imageAsset._id
            }
         }


         if (imageReference.postReference == false && imageReference.docReference == false) {
            deleteAsset(old_asset)
         }

         else {
            // console.log("The asset your attempting to delete is referenced ")
         }

         setConfirmation(false)
         setImageFile(null);
         setImageAsset(null);
         updateAuthorPost(originalPost.author_doc_id, newPostFields, postIndex, setUpdatedPost)

      }

      else if (isChangesConfirmed && !imageFile) {

         setConfirmation(false)
         updateAuthorPost(originalPost.author_doc_id, newPostFields, postIndex, setUpdatedPost)
      }


      updatedPost.post && updatePosts(updatedPost.post, authUserId, setUser, setPosts, setNotification, setUpdatedPost)

   }, [imageAsset, editedPost, isChangesConfirmed, updatedPost])

   return (


      // if the user changes the image we first need to upload  the image as an asset delete the old image ,  
      //  use the CreateOrReplace document  

      <main className="flex flex-col items-center">
         {
         notificationDisplay.display &&

            <ClientPortal selector="#portal">
               <Notification
                  message={notificationDisplay.message && notificationDisplay.message}
                  type={notificationDisplay.type} />
            </ClientPortal>
            
            }
         <section className="max-h-[45rem] h-[30rem]  flex items-center justify-center relative self-center mt-10 w-3/4">

            {
               imageUrl ?
                  <Image
                     unoptimized={false}
                     src={imageUrl}
                     alt=""
                     className="rounded-2xl justify-center relative m-auto object-cover"
                     fill /> :
                  editedPost.postImg && <Image
                     unoptimized={false}
                     src={urlForImg(editedPost.postImg).url()} alt="no image"
                     className="rounded-2xl justify-center relative m-auto object-cover"
                     fill />


            }
            {!editedPost.postImg && !imageUrl && <div className="h-56 w-56 flex flex-col items-center">
               <NoImage />
               <h1 className="text-xl">no image for this post</h1>
            </div>}
         </section>
         <input type="file" id="file" className="file-element" style={{ display: "none" }} accept="image/*" onChange={e => readFile(e)} />
         <input ref={titleRef} defaultValue={editedPost?.title} className="text-xl m-10  mb-10 h-auto p-8 items-center self-center w-[85%] shadow-2xl rounded-lg bg-[#0E144E3D]" />

         <textarea ref={textAreaRef} rows={10} defaultValue={editedPost?.body} role="textbox" className="text-xl mb-10 h-auto p-8 items-center self-center w-[85%] shadow-2xl rounded-lg bg-[#0E144E3D]">
         </textarea>
         <div className="flex mb-3 max-[750px]:grid grid-cols-2">

            <button className="m-4 w-[8.4rem] h-14 rounded-lg bg-[#10ffb777]" onClick={(e) => displayFileReader()}>
               change image
            </button>

            <button onClick={() => {

               setEditedPost((prev: any) => {

                  return {
                     ...prev,
                     title: titleRef.current?.value,
                     body: textAreaRef.current?.value //🤷‍♀️
                  }

               })

            }}
               className="m-4 w-[8.4rem] h-14 rounded-lg bg-[#04f52c96]">
               save changes
            </button>

            <button onClick={() => {
               titleRef!.current!.value = originalPost.title
               textAreaRef!.current!.value = originalPost.body
               setEditedPost(originalPost)
               setIsEdited(false)
               setImageFile(null);
               setImageUrl(null);
            }} className="m-4 w-[8.4rem] h-14 rounded-lg bg-[#ff9900b4]">
               discard changes
            </button>
            {isEdited && <button className="m-4 w-[8.4rem] h-14 rounded-lg bg-[#10ffb777]"
               onClick={() => {
                  // display waiting overlay    
                  setNotification({ display: true, type: "awaiting publishing" })
                  publishChanges(imageFile)

               }}>
               publish
            </button>}
         </div>
      </main>

   )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

   const author: any = await fetchPost(ctx.query.author_id)
   const post = author[0].authorPosts.find((el: any) => el._key == ctx.query.post_key)
   const postIndex = author[0].authorPosts.indexOf(post)
   // console.log(post)
   return {
      props: { post, postIndex }

   }
}
