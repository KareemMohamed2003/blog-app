export default {
   name: "author",
   type: "document",
   title: "author",
   fields: [
      {
         name: "authorName",
         title: "authorName",
         type: "string"
      },
      {
         name: "email",
         title: "email",
         type: "string"
      },
      {
         name: "author_id",
         title: "author_id",
         type: "string"
      },
      {
         name: "profilePic",
         title: "profilePic",
         type: "image"
      },
      {
         name: "authorPosts",
         type: "array",
         of:
            [
               {
                  type: "object",
                  title: "authorPost",
                  fields: [
                     {
                        name: 'author',
                        title: "author",
                        type: "string"
                     },

                     {
                        name: "authorImg",
                        title: "authorImg",
                        type: "image"
                     },
                     {
                        name: 'title',
                        title: "title",
                        type: "string"
                     },

                     {
                        name: "postImg",
                        title: "postImg",
                        type: "image"
                     },

                     {
                        name: "body",
                        title: "body",
                        type: "text"
                     },

                     {
                        name: "publishedAt",
                        title: "publishedAt",
                        type: "string"
                     },

                     {
                        name: "document_id",
                        title: "document_id",
                        type: "string"
                     }
                  ]
               }
            ]
      }

   ]
}