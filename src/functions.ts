import { fetchAuthor, fetchDocuments } from "./sanity";

export const dateFormatter = Intl.DateTimeFormat("en-us", {

   timeStyle: "short",
   dateStyle: "short"

});
export   const filterTags = (arr: any[]) => {

   return arr.filter((el, index) => {
      // console.log(arr.indexOf(el) == index)
      return arr.indexOf(el) == index

   })
}
export const removeClass = (selector: string, className: string) => {

   document.querySelector(selector)?.classList.remove(className)

}

// create a function to find the selected post from the array that will be  returned as a result of a query 
// from sanity 

export const findSelectedPost = (key: any, body: string | null, title: string | null, posts: any[]) => {

   const selectedPost = posts?.find((el) => { return el.key == key && el.body == body && el.title == title })
   // console.log("this is the Selected POST : ")
   // console.log(selectedPost);
   return selectedPost;

}

export const searchPosts = (posts: any[], searchText: string) => {
   // takes a string from the user if the string has one character returns an array of objects that has their title property starting  with that character
   //  if the length of the string is more than 1 uses the regular expression to do the same thing 📝note that: regEx is case Senisitve 

   const searchResults: any[] = [];

   if (searchText.length == 1) {
      const filteredPosts = posts?.filter((el) => el.title.startsWith(searchText))
      filteredPosts.map(el => searchResults.push(el))
      // console.log(searchResults)
      // return searchResults;
   }

   else if (searchText.length > 1) {

      const escapedExp = searchText.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&')
      const exp = new RegExp(escapedExp)
      const filteredPosts = posts?.filter((el) => exp.test(el.title))
      filteredPosts.map(el => searchResults.push(el))
      // console.log(searchResults)

   }

   // console.log(searchResults)
   return searchResults


}


export const readFile = (e: any, setImageUrl?: any, setImageFile?: any) => {
   e.preventDefault()

   if (e.target.files[0]) {
     
      setImageUrl && setImageUrl(URL.createObjectURL(e.target.files[0]))
      setImageFile && setImageFile(e.target.files[0])
   }
}

// get the post key which will be  used to filter the author posts array
//  when it's fetched  so we  know which post the user selected and to display 
export const isPostCreated = (createdPost: any, authUserId: any, setUser: any, setPosts: any, setNotification: any,setCreatedPost:any) => {
   new Promise((resolve, reject) => {
      if (createdPost) {
    
         setTimeout(() => {
            fetchAuthor(authUserId, setUser);
            fetchDocuments("post", setPosts)
            resolve(createdPost)
            // console.log("this is the created post",createdPost)
         }, 5000)
         setNotification({type:"post created", display: true })
      }

      else {
         reject("something went wrong with creating the post")
      }
   }).then((res) => {
      // console.log(res)
      setCreatedPost({postDoc:null,authorPost:null})
      disableNotification(setNotification)
   }).catch((err=>{
      setNotification({ type: "post creation failed", display: true })
      setTimeout(() => {
         disableNotification(setNotification)
      }, 2500)
   }))

}
export const updatePosts = (updatedPost: any, authUserId: any, setUser: any, setPosts: any, setNotification: any, setUpdatedPost: any) => {

   // console.log(updatedPost)
   new Promise((resolve, reject) => {
      if (updatedPost) {

         setTimeout(() => {
            fetchAuthor(authUserId, setUser);
            fetchDocuments("post", setPosts)
            setUpdatedPost({ post: null })
            resolve(updatedPost)
            
         }, 5000)
         setNotification({ type: "publishing succeeded", display: true })

      }

      else {
         reject("looks like something went wrong")
      }
   }).then((res) => {
      // console.log(res)
      setNotification({ type: "reset", display: false })
      removeClass("#portal", "portal-blur")

   }).catch((msg) => {
      // if updating the post failed  we should redirect the user to the MyBlogs page
      setNotification({ type: "publishing failed", display: true })

      setTimeout(() => {
         setNotification({ type: "reset", display: false })
         removeClass("#portal", "portal-blur")
      }, 2500)
         ;
   })
}

export const disableNotification=(setNotification:any)=>{
setNotification({type:"reset",display:false,message:null})
   removeClass("#portal", "portal-blur")
}

   // const addTag = (tagName: string) => {
   //    // this  funtion is currently not used 
   //    if (postData?.tags && postData.tags.length >= 1) {
   //       const tags = filterTags([...postData.tags, tagName]);
   //       // console.log(tags)
   //       setPostData((prev: any) => {
   //          return {
   //             ...prev, tags: tags
   //          }

   //       })
   //    }

   //    else {
   //       setPostData((prev: any) => {
   //          return {
   //             ...prev, tags: [tagName]
   //          }

   //       })
   //    }

   // }


   // const toggleTag = (tagName: string) => {
//    // this function will add the tag  clicked by the user in the post data and
//    // will toggle the tag display to false in the menu
//    // we should display it upawards
//    setPostData((prev: any) => {
//       return {
//          //
//          ...prev, tags: [...postData.tags, tagName]
//       }
//    })
//    setTagsDisplay((prev) => {

//       return { ...prev, js_t: false }

//    })
// }