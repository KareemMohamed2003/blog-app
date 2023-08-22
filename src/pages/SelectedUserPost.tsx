import Image from "next/image"
import { urlForImg, client as sanityClient, fetchAuthor } from "@/sanity";
import { GetServerSidePropsContext } from "next";
import Author from "@/components/Author";
import NoImage from "@/components/NoImage";


export default function SelectedUserPost({ query, post }: any) {

 

   return (

      post &&

      <main className="flex flex-col items-center">
         <section className="max-h-[45rem] h-[35rem]  relative self-center mt-10 w-[85%] items-center justify-center flex">
      {    post.postImg?  <Image unoptimized={false} src={urlForImg(post?.postImg?.asset._ref).url()} className=" rounded-2xl justify-center relative m-auto object-cover" fill alt="" />
   :<div className="h-40 w-40 "><NoImage/></div>   
   }
         </section>
         <h1 className="text-4xl m-10 max-[600px]:text-2xl">{post.title}</h1>
         <div className="w-[85%] m-2">
            <Author author={post.author} authorImg={post?.authorImg} publishedAt={post.publishedAt} />
         </div>
         <div className="mb-20 h-auto p-8 items-center self-center w-[85%] shadow-2xl rounded-lg bg-[#0E144E3D] ">
            <p className="text-2xl  text-slate-300  break-words max-[600px]:text-lg">{post.body}</p>
         </div>
      </main>

   )

}



export async function getServerSideProps(ctx: GetServerSidePropsContext) {
   // console.log("query:")
   // console.log(ctx.query.author_id)
   const author: any = await fetchAuthor(ctx.query.author_id)
   console.log(author)
   const post = author[0]?.authorPosts.find((el: any) => el._key == ctx.query.post_key)
   // console.log(post)
   // console.log("dsdfdsd")

   return {
      props: {
         post
      }
   }
}

{/* post title */ }
{/* post image  */ }
{/*  maybe post author  */ }
{/* post author image */ }
{/* post tags  */ }