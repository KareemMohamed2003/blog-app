export interface IAuthor {
  author: string,
  authorImg: any,
  publishedAt: any
}

export interface IPost {

  title: string,
  postImg?: any,
  tags: any[],
  body: string,
  author: string,
  publishedAt: any,
  _key?: any
  document_id?:any,
  setImageReference?:any,
  setNotification?:any,
  setOriginalImageAsset?:any
  ,
  setPostToDelete?:any,
  setDeletedPost?:any
  //  authorImg: any,

}
export interface IBlogPost extends IPost {

  _id?: string
  authorImg: any

}

export interface ISearchResult {

  author: string,
  title: string,
  postImage: any,
  authorImg: any

}

export interface INotification {
  type: null | string,
  display: boolean | null,
  message?: null | string
}

export interface IUpdatedPost{
  updateUI?:boolean|null,
  post:any,
}