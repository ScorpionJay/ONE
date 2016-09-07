const serviceUrl = 'http://wind.zicp.net/v1/'

export default {
  initTab:'Home',
  loginUrl:serviceUrl,
  registerUrl: serviceUrl + 'register',
  accountUrl: serviceUrl + 'account',
  accountUrl2: serviceUrl + 'account/user',
  accountSignUrl: serviceUrl + 'account/sign',
  fileUpload: serviceUrl + 'file/save',
  fileUrl: serviceUrl + 'file/',
  postsUrl: serviceUrl + 'article/posts',
  postUrl: serviceUrl + 'article/post/',

  pageSize:10,

  postListApi: serviceUrl + 'post/list/',
  postApi: serviceUrl + 'post/add/',

  postApiTest: serviceUrl + 'file/singleSave/',

  postApi2: serviceUrl + 'post/post/',

  postAll: serviceUrl +  'post/lists',

  thumbnailApi: serviceUrl + 'file/thumbnail/',//缩略图


  word:'WORD',
  picture:'PICTURE'

};