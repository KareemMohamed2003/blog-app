import { GetServerSidePropsContext } from "next";
import Image from "next/image"
import Author from "@/components/Author";
import NoImage from "@/components/NoImage";
import { urlForImg, client as sanityClient, fetchDocuments } from "@/sanity";

export default function SelectedPost({ query, post }: any) {

// console.log(post)
   return (

      <section>

         <main className="flex flex-col items-center">
            <section className="flex max-h-[45rem] h-[35rem] relative   mt-10  items-center self-center w-[85%]">

               {post.postImg ? <Image  src={urlForImg(post?.postImg?.asset._ref).url()} className="rounded-2xl justify-center  object-cover" fill sizes="(max-width: 768px) 60vw, (max-width: 1200px) 70vw"  alt="" />
               
               :<div className="h-36 w-36 self-center"><NoImage/></div>}

            </section>

            <h1 className="text-5xl m-10 max-[600px]:text-2xl">{post.title}</h1>

            <div className="w-[85%] m-2">

               <Author author={post.author} authorImg={post.authorImg} publishedAt={post.publishedAt} />
            </div>

            <div className="mb-20 h-auto p-8 items-center self-center w-[85%] shadow-2xl rounded-lg bg-[#0E144E3D]">
               <p className="text-2xl text-slate-300  break-words  max-[600px]:text-lg">{post.body}</p>

            </div>

         </main>

      </section>
   )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

   const posts = await fetchDocuments("post")
   const post = posts.find((el: any) => el._id === ctx.query.postId)
   return {

      props: {
         post

      }

   }
}