import Link from "next/link";
import AddPostIcon from "@/components/svg/AddPostIcon";
import BlogPost from "@/components/BlogPost";
import { Context } from "@/components/ContextProvider"
import { useContext, useEffect, useState } from "react"
import { IBlogPost } from "@/interfaces";
import SadFace from "@/components/SadFace";
import SpinnerLoader from "@/components/SpinnerLoader";

export default function PostsPage() {

  const { posts }: any = useContext(Context)

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {

    setLoading(false)

  }, [posts])
  return (

    <main className="flex flex-col  items-center  w-100 relative min-h-screen  mb-10 mt-28">
{/* 
      <Link href={"/AddPostPage"} className="self-end max-[850px]:self-center">
        <div className="flex items-center self-end justify-evenly  mr-10 mb-10 mt-14 bg-[#0094FF] rounded-3xl w-48 h-14 cursor-pointer max-[750px]:mr-0">
          <p className="text-xl  -z-2 max-[750px]:text-lg ">
            create post
          </p>
          <div className="w-8 h-8">

            <AddPostIcon />
          </div>
        </div>
      </Link> */}

      {posts && posts.length > 0 && !isLoading &&
        <section className="justify-items-center w-full  min-h-screen grid gap-5 grid-cols-2 max-[1060px]:flex flex-col items-center ">

          {
            posts && posts.length > 0 && posts.map((el: IBlogPost) =>
              <Link key={el._id} href={{
                pathname: "/SelectedPost"
                , query: { postId: el._id }
              }}  >
                <BlogPost key={el._id} author={el.author}
                  authorImg={el.authorImg} publishedAt={el.publishedAt}
                  postImg={el.postImg?.asset._ref} title={el.title} tags={[]} body={el.body} />

              </Link>
            )
          }
        </section>



      }

      {isLoading && <div className="self-center justify-center mt-8"><SpinnerLoader /></div>}
      {posts && posts.length <= 0 && <SadFace />}
    </main>
  )
}





