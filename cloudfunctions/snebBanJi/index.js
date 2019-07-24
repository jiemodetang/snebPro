// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const {  } = event
  const { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  const db = cloud.database()
 // 查询当前用户所有的 snebBanJi
  let snebBanJi = await db.collection('snebBanJi').get()
  return {
     snebBanJi
  }
}