import { fetchAuthor, fetchDocuments } from "@/sanity";
import { useUser } from "@auth0/nextjs-auth0/client";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
export const Context = createContext({});
export default function ContextProvider({ children }: PropsWithChildren) {

   const [posts, setPosts] = useState(null)
   const [currentUserPosts, setUserPosts] = useState<any>(null);
   const [user, setUser] = useState<any>(null);
   const [postToEdit, setPostToEdit] = useState<any>();


   const currentAuthenticatedUser = useUser();
   // console.log(user)
   // console.log(currentUser)
   // const currentUserBlogs=fetchAuthor(currentUser.user?.sub)
   // const allPosts=fetchDocuments("post",setPosts)
   useEffect(() => {

      fetchAuthor(currentAuthenticatedUser.user?.sub, setUser)
      fetchDocuments("post", setPosts)  // fetch documents of type post 

   }, [currentAuthenticatedUser])

   useEffect(() => {
      // console.log(user)
      // console.log("context second use Effect is called")
      // console.log(user)
      if (user) {

         setUserPosts(user?.authorPosts)
         // console.log(user?.authorPosts)
         // console.log(user)

      }

      else if (currentAuthenticatedUser.user) {
         fetchAuthor(currentAuthenticatedUser.user?.sub, setUser)
         // console.log("use context useEffect");
      }

   }, [user])

   return (

      <Context.Provider value={{ user, currentUserPosts, posts, setPosts, setUserPosts, setPostToEdit, postToEdit ,setUser}}>
         {children}
      </Context.Provider>

   )
}
