import Image from "next/dist/client/image";
import DeleteIcon from "./svg/DeleteIcon";
import EditPostIcon from "./svg/EditPostIcon";
import Link from "next/link"
import { IPost } from "@/interfaces";
import { useContext } from "react";
import { Context } from "./ContextProvider";
import { urlForImg, deleteDocument, deleteAuthorPost, } from "@/sanity";
import NoImage from "./svg/NoImageIcon";

export default function MyPost({ title, postImg, tags, body, author,
   publishedAt, _key, document_id,
   setNotification,
   setOriginalImageAsset, setPostToDelete,
   setDeletedPost
}: IPost) {

   const { user, setUser }: any = useContext(Context);



   return (

      <section>

         <Link href={{
            pathname: "/SelectedUserPost"
            , query: { author_id: user?.author_id, post_key: _key }
         }}>

            <main className="flex flex-col items-center shadow-xl rounded-xl  m-30 min-h-[23rem] w-[33rem] bg-[#0e144e63] max-lg:max-w-min max-h-[31rem] max-[550px]:w-[21rem] max-[550px]:min-h-[18rem]"   >
               {/*  image */}
               <section className="flex flex-wrap justify-around items-center  w-full">
                  <div className="h-44 w-full relative rounded-xl self-center justify-center flex">
                     {postImg ? <Image src={urlForImg(postImg).url()} className="rounded-xl object-cover" fill alt="" /> : <div className="h-40 w-40 "><NoImage /></div>}
                  </div>
                 
               </section>
     
               <div className="m-4">
                  <h1 className="text-xl  text-center mb-4 max-[500px]:text-lg font-medium">{title && title?.length < 36 ? title : title?.substring(0, 28) + "..."} </h1>


                  <p className="text-lg max-[500px]:text-xs">
                     {body.length < 68 ? body : body.substring(0, 50) + "..."}
                  </p>
               </div>
            </main>
         </Link>

         {/* link should be right here  */}
         <div className="flex  justify-around m-4  relative z-100   max-[550px]:justify-evenly max-[550px]:m-3">

            <button className="bg-[#ED0A0A] p-2 rounded-2xl w-32 flex items-center justify-center z-10 "

               onClick={() => {

                  setNotification({ type: "deleting post", display: true })

                  postImg && setOriginalImageAsset(postImg)
                  deleteDocument(document_id, setDeletedPost)
                  deleteAuthorPost(_key, user?._id, user?.author_id, setUser, setDeletedPost)
                  setPostToDelete({ title, postImg, tags, body, author, publishedAt, _key, document_id })


               }}>

               <div className="w-6  self-center mr-2 h-6">
                  <DeleteIcon />
               </div>
               <p className="text-xl">
                  delete
               </p>
         
            </button>

            <Link href={{
               pathname: "/EditPost"
               , query: { post_key: _key, author_id: user?.author_id }
            }}>

               <button className="bg-[#FF9900] p-2 rounded-xl w-32 flex items-center justify-center">
                  <div className="w-8  self-center mr-2">
                     <EditPostIcon />
                  </div>
                  <p className="text-xl">
                     edit
                  </p>
               </button>
            </Link>
         </div>
      </section>
   )

}