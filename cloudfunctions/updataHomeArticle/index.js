// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
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
  let snebDetailData = await db.collection('snebHomeArticle').add({
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