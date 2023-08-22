import { IPost, INotification } from "@/interfaces"
import { Context } from "@/components/ContextProvider"
import { useContext, useState, useEffect } from "react"
import { disableNotification } from "@/functions"
import { useRouter } from "next/router"
import { deleteAsset, checkAssetsReferences, fetchDocuments, fetchAuthor } from "@/sanity"
import MyPost from "@/components/myPost"
import SadFaceIcon from "@/components/svg/SadFaceIcon"
import ClientPortal from "../components/ClientPortal"
import Notification from "../components/Notification";
import SpinnerLoader from "@/components/SpinnerLoader"
import SadFace from "@/components/SadFace"

export default function MyBlogs() {
   const router = useRouter();
   const initialImgRef = { isDocReferenced: null, docReference: null, isPostReferenced: null, postReference: null };
   const initialDeletedPost = { oldDoc: null, oldAuthorPost: null }
   const initialCmsData = { updatedDocs: null, updatedPosts: null }
   const { currentUserPosts, setUser, setPosts, user }: any = useContext(Context)
   const [imageReference, setImageReference] = useState<any>(initialImgRef); // stores the reference object that is the result of checking 
   const [notificationDisplay, setNotification] = useState<INotification>({ type: null, display: false, message: null })
   const [originalImageAsset, setOriginalImageAsset] = useState<any>(); // a state that stores the original image Asset in case we deleted the post and we want to check if the post's image asset 
   const [postToDelete, setPostToDelete] = useState<any>()
   const [updatedCmsData, setUpdatedCmsData] = useState<any>(initialCmsData)
   const [deletedPost, setDeletedPost] = useState<any>(initialDeletedPost)
   const [isLoading, setLoading] = useState(true)
   // console.log(postToDelete, originalImageAsset, updatedCmsData, deletedPost)
   // console.log(currentUserPosts)
   // console.log(imageReference)

   useEffect(() => {

      if (currentUserPosts) {
         setLoading(false)
      }

      if (currentUserPosts && currentUserPosts.length <= 0) {
         setLoading(false)
      }
      else if (!currentUserPosts) {
         setLoading(false)
      }
      if (!user) {
         router.push("/LoginPage")

      }
   }, [currentUserPosts, user])
   useEffect(() => {

      if (deletedPost.oldDoc && deletedPost.oldAuthorPost) {

         // if the post post document and the author post are deleted and there is no post image refetch without
         // checking if there is any reference to the Asset .  
         // console.log("first condition ran ")

         setDeletedPost(initialDeletedPost)
         // fetch the updated documents, authorPosts after deletion 
         fetchDocuments("post", setPosts).then((newDocs) =>
            setUpdatedCmsData((prev: any) => ({ ...prev, updatedDocs: newDocs })))

         fetchAuthor(user?.author_id, setUser).then((newAuthorPosts) =>
            setUpdatedCmsData((prev: any) => ({ ...prev, updatedPosts: newAuthorPosts })))

      }
      //check if the image asset is referenced after the post documents , authors posts have been updated


      if (updatedCmsData.updatedPosts && updatedCmsData.updatedDocs && postToDelete.postImg) {
         // console.log("first updated Cms ran")
         checkAssetsReferences(postToDelete.postImg, setImageReference)
         setUpdatedCmsData(initialCmsData)
         setPostToDelete(null)

      }
      else if (updatedCmsData.updatedPosts && updatedCmsData.updatedDocs && !postToDelete.postImg) {
         // console.log("second updated Cms ran")
         setImageReference({ isDocReferenced: false, docReference: false, isPostReferenced: false, postReference: false });
         disableNotification(setNotification)
         setUpdatedCmsData(initialCmsData)
         setPostToDelete(null)
         setOriginalImageAsset(null)
      }
      if (imageReference?.postReference == false && imageReference?.docReference == false) {

         // console.log("second  condition ran ")
         const old_asset = originalImageAsset;   // i got an error saying that _ref is undefined my guess is that  when the post got deleted the post Img got deleted as
         old_asset && deleteAsset(old_asset)
         disableNotification(setNotification)
         setImageReference(initialImgRef)

      }
      //delete old image asset from sanity,// ⚠⚠⚠ // asset cannot be deleted from sanity if there is reference to it //

      else if (imageReference?.postReference && imageReference?.docReference) {
         console.log("third condition ran")
         // console.log("The asset your attempting to delete is referenced")
         disableNotification(setNotification)
         setImageReference(initialImgRef)
      }
   }, [imageReference, postToDelete, updatedCmsData, deletedPost])

   return (

      <main className="items-center">

         {/* <SearchResult/> */}

         {
            notificationDisplay.display &&
            <ClientPortal selector="#portal">
               <Notification
                  message={notificationDisplay.message && notificationDisplay.message}
                  type={notificationDisplay.type} />
            </ClientPortal>
         }

         {
            currentUserPosts && currentUserPosts.length > 0 &&
            <section className="grid gap-4 grid-cols-2 grid-rows-2 justify-items-center mb-10 mt-14 max-[1060px]:flex flex-col items-center">
               {currentUserPosts.length > 0 && currentUserPosts?.map((el: IPost) =>

                  <div key={el._key}>

                     <MyPost
                        _key={el._key}
                        title={el.title}
                        postImg={el?.postImg?.asset._ref}
                        tags={[]} body={el.body}
                        author={el.author}
                        publishedAt={el.publishedAt}
                        document_id={el.document_id}
                        setImageReference={setImageReference}
                        setNotification={setNotification}
                        setOriginalImageAsset={setOriginalImageAsset}
                        setPostToDelete={setPostToDelete}
                        setDeletedPost={setDeletedPost}
                     />

                     {/* title, postImg, tags, body, author, publishedAt */}
                  </div>
               )

               }


            </section>


         }
         {isLoading &&
            <div className="flex self-center justify-center mt-8">
               <SpinnerLoader />
            </div>}
         {currentUserPosts && currentUserPosts.length <= 0 && !isLoading && <SadFace />}
         {!currentUserPosts && !isLoading && <SadFace />}
      </main>

   )

}
