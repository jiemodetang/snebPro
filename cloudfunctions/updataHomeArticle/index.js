// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

async function updataHomeArticleGet(){
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()
  let updataHomeArticleGetData = await db.collection('snebHomeArticle').get()
  return {
    updataHomeArticleGetData
  }
}
async function updataHomeArticleUpdate(event){
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()
  const {
    pleaseEnterTitle,
    pleaseEnterAuthor,
    textareaValue,
    casts,
  } = event
  let updataHomeArticleData = await db.collection('snebHomeArticle').add({
    data: {
      _openid: OPENID,
      pleaseEnterTitle,
      pleaseEnterAuthor,
      textareaValue,
      casts,
    }
  })
  return {
    updataHomeArticleData
  }
}
// 云函数入口函数
exports.main = async(event, context) => {
  switch (event.action) {
    case 'updataHomeArticleGet':
      {
        return await updataHomeArticleGet(event)
      }
    case 'updataHomeArticleUpdate':
      {
        return await updataHomeArticleUpdate(event)
      }
    default:
      {
        return
      }
  }

  
}