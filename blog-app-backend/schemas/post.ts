export default {
   name: "post",
   type: "document",
   title: "post",
   fields: [
      {
         type: "string",
         name: "title",
         title: "title",
         publishedAt: "date"
      },
      {
         type: "string",
         name: "publishedAt",
         title: "publishedAt",

      },
      {
         type: "image",
         name: "postImg",
         title: "postImg"
      },
      {
         type: "text",
         name: "body",
         title: "body"
      },
      {
         type: "string",
         name: "author",
         title: "author"
      },
      {
         type: "image",
         name: "authorImg",
         title: "authorImg"
      },
      {
         type: "array",
         name: "tags",

         of: [
            {
               type: "string",
               title: "tags"
            }
         ]
      }
   ]
}