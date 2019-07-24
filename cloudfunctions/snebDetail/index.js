// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { optionsId, content, image, name,time} = event

  let snebDetailData = await db.collection('snebClassBsdSnebInfor').where({
    _id:optionsId
  }).update({
    data:{
      comment: _.push({
        _openid: wxContext.OPENID,
        content,
        image,
        name,
        time
      })
    }
  })
  return {
    snebDetailData
  }
}