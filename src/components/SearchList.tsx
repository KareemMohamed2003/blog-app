import { useContext, useEffect, useState } from "react";
import { searchPosts } from "../functions";
import { Context } from "./ContextProvider";
import SearchResult from "./SearchResult";
import Link from "next/link";
export default function SearchList({ searchInput, setSearchListDisplay }: any):any {

   const { posts }: any = useContext(Context)

   const [filteredPosts, setFilteredPosts] = useState<any[] | null>(null);

   useEffect(() => {

      setFilteredPosts(searchPosts(posts, searchInput))

   }, [searchInput])

   return (

      filteredPosts && filteredPosts.length > 0 &&

      <section className="absolute  z-30 b-0 r-0 l-0 bg-[#3233302a] h-80  rounded-lg backdrop-blur-[20px]  top-14 overflow-y-scroll overflow-x-hidden">

         {filteredPosts && filteredPosts.map((el: any) =>

            <Link
             key={el._id}
               onClick={() => setSearchListDisplay(false)}
               href={{
                  pathname: "/SelectedPost"
                 ,query: { postId: el._id }
               }}>

               <SearchResult key={el._id}
                  title={el.title}
                  author={el.author}
                  postImage={el.postImg?.asset._ref}
                  authorImg={el.authorImg?.asset._ref}
               />

            </Link>

         )}

      </section>



   )
}
