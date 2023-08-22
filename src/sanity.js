import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const urlForImg = (source) => {

  // function used to get the source url of an image from sanity 
  // takes the image asset id (sources) returns a usable url 
  return builder.image(source).auto("format")

}

export const client = createClient({
  projectId: "xplrd9jy",
  dataset: "production",
  apiVersion: new Date().toLocaleDateString("sv-SE"),
  // token:process.env.REACT_APP_SANITY_CLEINT_TOKEN,
  token: "skaEBrRmBRWjlnkEvNJB7CzbKihkm2UXjnHavLZMRXk5F5uD1cpaobdE2KdrpgwYnlhiJuSsIQ9xvDMfo"
   ,useCdn: false
  , ignoreBrowserTokenWarning: true
});


const builder = imageUrlBuilder(client)

export const createSanityDocument = (documentType, fields, setPostData, setCreatedPost) => {

  const document = {
    _type: documentType,
    ...fields,

  }

  client.create(document).then((res) => {
    // console.log(`new sanity document Created, document ID is ${res._id}`)

    setCreatedPost && setCreatedPost((prev) => {

      return {
        ...prev, postDoc: res
      }

    })

    setPostData && setPostData((prev) => {

      return {
        ...prev, document_id: res._id
      }

    })


  })

}
export const fetchDocuments = async (documentType, setState) => {
  const documents = await client.fetch(`*[_type == "${documentType}"]`);
  if (setState) setState(documents)
  // console.log(documents)
  return documents;
}

export const fetchAuthor = async (author_id, setState) => {


  const author = await client.fetch(`*[_type == "author" && author_id=="${author_id}"]`).catch((err) => {

  })

  if (setState) { setState(author[0]) }
  // console.log(author);
  return author;

}

export const fetchAllAuthors = async (setState) => {


  const authors = await client.fetch(`*[_type == "author"]`).catch((err) => {
    // console.log(err) 

  })

  if (setState) { setState(authors) }
  // console.log(authors);
  await authors;
  return authors
}

export const fetchPost = async (author_id) => {

  // console.log(author_id)
  const res = await client.fetch(`*[_type == "author" && author_id=="${author_id}"] {authorPosts}`).catch((err) => {
    // console.log(err)
  })
  // console.log(res)
  return res;

}

export const addImageToDocument = (document_id, imageFile, imageFieldName, setState) => {
  // used to add an image to a document and can also update an the image fields (postImg,profilePic)
  client.assets.upload('image', imageFile, { contentType: imageFile.type, filename: imageFile.name }).then((imageAsset) => {

    // console.log(imageAsset._id)

    // console.log('The image was uploaded!', imageAsset)

    if (setState) setState(imageAsset)

    if (imageFieldName === "postImg") {
      client.patch(document_id).set({

        postImg: {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: imageAsset._id
          }
        }

      }).commit()
    }

    if (imageFieldName === "profilePic") {

      client.patch(document_id).set({

        profilePic: {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: imageAsset._id
          }
        }
      }).commit().catch((err) => {

      })
    }

  }).catch((error) => {
    // console.log(error)
    // console.error('Upload failed:', error.message)
  })

}

export const addPostToAuthorList = (documentId, imageAsset, documentFields, setCreatedPost) => {
  // adds a post object to the authorPosts array in the author document in sanity .   

  // check if there is an imageAsset before adding image 
  const authorPostFields = {
    author: documentFields.author,
    title: documentFields.title,
    body: documentFields.body,
    publishedAt: documentFields.publishedAt,
    document_id: documentFields.document_id

    , authorImg: { ...documentFields.authorImg }
  };
  if (imageAsset) {
    authorPostFields.postImg = {
      _type: "image",
      asset: {
        _ref: imageAsset._id,
        _type: "reference"
      }

    }
  }

  client.patch(documentId).setIfMissing({ authorPosts: [] }).insert('after', 'authorPosts[-1]',
    [
      authorPostFields


    ]).commit({
      // Adds a `_key` attribute to array items, unique within the array, to
      // ensure it can be addressed uniquely in a real-time collaboration context
      autoGenerateArrayKeys: true,
    }).then((res) => {
      setCreatedPost((prev) => {
        return {
          ...prev, authorPost: res
        }
      })
    });

}

export const updateDocument = (document_id, fields) => {
  // updates sanity document takes an id and document fields 

  client.patch(document_id) // Document ID to patch
    .set(fields)
    .commit() // Perform the patch and return a promise
    .then((updatedDoc) => {
      // console.log('Hurray, the document is updated! New document:')
      // console.log(updatedDoc)
    }).catch((err) => {

    })

}

export const deleteDocument = (document_id, setDeletedPost) => {
  client.delete(document_id)
    .then((deleted_doc) => {
      // console.log('document with id : ', document_id, "deleted")
      if (setDeletedPost) setDeletedPost((prev) => {
        return { ...prev, oldDoc: deleted_doc }
      }
      )
    }).catch((err) => {

    })

}

export const deleteAsset = (asset_id) => {
  // deletes asset from sanity e.g image 
  client.delete(asset_id)
    .then(result => {

      // console.log('deleted image asset', result)
    }).catch(error => {

      // console.log(error)
    })

}

export const deleteAuthorPost = (post_key, author_doc_id, author_id, setUser, setDeletedPost) => {
  // removes a post object  from the authorPosts array in the author document .  
  // we either this function   the post index,key 

  const postsToRemove = [`authorPosts[_key=="${post_key}"]`]

  client.patch(author_doc_id).unset(postsToRemove).commit().then((res) => {
    // console.log(res)
    setDeletedPost && setDeletedPost((prev) => {
      return {
        ...prev, oldAuthorPost: res
      }
    })

  }

  ).catch((err) => { })
  //  console.log(err)


}

export const updateAuthorPost = (author_doc_id, fields, postIndex, setUpdatedPost) => {


  // this method updates the post for the AuthorPost Array in the author Document in sanity .  
  // to update the post we need to get the index of the post ,key
  // console.log(fields)
  client.patch(author_doc_id).insert("replace", `authorPosts[${postIndex}]`, [fields]).commit().then(res => {
    // we have attempted to redirect the user to the MyBLogs page in the then handler .  
    // console.log("author posts updated ")
    // console.log(res);

    res && setUpdatedPost({ post: res, updatedUI: false })

  }

  ).catch((err) => { })


}

export const checkAssetsReferences = async (asset_id, setState) => {
  // fetch post Documents if there is any refereneces we return the assetRefect with the referenece(document ) and
  // a boolean value in an assetRefect    
  // checks if the asset has any referenece in the post Documents , author posts and returns an assetRefect with the result . 

  // we might need to check if there is referenece in each user posts as well 
  // console.log("asset_id provided to the checkAssets function : ", asset_id)
  let assetRef = { isDocReferenced: null, docReference: null, isPostReferenced: null, postReference: null } // assetRefects that stores the values of image assets if found  and boolean values indicating whether they  exists or not in the post documents, authorPosts array fro each author  
  const postDocuments = await fetchDocuments("post")
  // console.log(postDocuments)
  const docReference = postDocuments.find((el) => el.postImg?.asset?._ref === asset_id) // returns undefined 
  // console.log(docReference)
  // there is no reference for the image with the asset_id :0a3e1455f8ae0de1c50a47f8d0508c0062e68e09-1920x1915 
  // therefore the doc reference will be always undefined .  

  if (docReference) {

    // console.log(docReference)
    assetRef.docReference = docReference;
    assetRef.isDocReferenced = true

  }

  else {

    assetRef.docReference = false;
    assetRef.isDocReferenced = false

  }
  // fetch and check if there is author posts that has the image Asset before deleting it 
  const authors = await fetchAllAuthors();
  // console.log(authors)

  for (let i = 0; i < authors.length; i++) {

    // console.log(authors[i])
    if (authors[i].hasOwnProperty("authorPosts")) {  // check if the author object has authorPosts property 
      // console.log(authors[i])
      if (authors[i].authorPosts.length == 0) {
        // if authoir Posts is empty set ImageReference to false 
        assetRef.postReference = false
        assetRef.isPostReferenced = false
        setState && setState(assetRef)
      }
      for (let j = 0; j < authors[i].authorPosts.length; j++) {

        // console.log(authors[i].authorPosts[j])
        if (authors[i]?.authorPosts[j]?.postImg?.asset?._ref === asset_id) {
          // console.log(authors[i].authorPosts[j])
          assetRef.postReference = authors[i].authorPosts[j] // if there is an image asset  referenece assign it. 
          assetRef.isPostReferenced = true;
          // console.log(assetRef)
          setState && setState(assetRef)

          break;
        }

        else {

          assetRef.isPostReferenced = false;
          assetRef.postReference = false;
          // console.log(assetRef)
          setState && setState(assetRef)

        }

      }
    }

  }
  // if (setState) setState(assetRef)
  // return assetRef;


}

