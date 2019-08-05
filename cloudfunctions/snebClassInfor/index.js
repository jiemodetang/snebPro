// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const {
  OPENID,
  APPID,
  unionid
} = cloud.getWXContext()
const db = cloud.database()
// 云函数入口函数
async function snebClassInforGet(event) {
  const {
    skipData,
    limitData
  } = event
  // 查询当前用户所有的 snebClassBsdSnebInfor
  let snebUserData = await db.collection('snebUser').where({
    _openid: OPENID
  }).get()
  let snebBanJiData = await db.collection('snebBanJi').where({
    className: snebUserData.data[0].className
  }).get()
  const {data } = snebBanJiData
  const dataObj = data[0]
  const classSituation = dataObj.classSituation || ''
  let snebClassBsdSnebInforData = await db.collection(classSituation)
    .skip(skipData) // 跳过结果集中的前 10 条，从第 11 条开始返回
    .limit(limitData) // 限制返回数量为 10 条
    .get()
  return {
    snebClassBsdSnebInforData,
    data
  }

}
async function snebClassInforUpdate(event) {
  let snebClassInforUpdateData = {}
  const {
    average,
    casts,
    collect_count,
    comment,
    genres,
    images,
    ratings_count,
    title,
    year
  } = event
  snebClassBsdSnebInforData = await db.collection('snebClassBsdSnebInfor').add({
    data: {
      average,
      casts,
      collect_count,
      comment,
      genres,
      images,
      ratings_count,
      title,
      year
    }
  })
  return {
    snebClassInforUpdateData,
  }
}
exports.main = async(event, context) => {
  switch (event.action) {
    case 'snebClassInforGet':
      {
        return await snebClassInforGet(event)
      }
    case 'snebClassInforUpdate':
      {
        return await snebClassInforUpdate(event)
      }
    default:
      {
        return
      }
  }

}