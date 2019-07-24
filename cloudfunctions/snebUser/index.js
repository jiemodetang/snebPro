// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数

async function snebUserSearch(event) {
  // const {
  //   _openid
  // } = event
  const {
    OPENID,
    APPID
  } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  let snebUser
  // const wxContext = cloud.getWXContext()
  snebUser = await db.collection('snebUser').where({
    _openid: OPENID
  }).get()
  return {
    snebUser
  }
}
async function snebUserAdd(event) {
  const {
    OPENID,
    APPID
  } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的

  let snebUserAdd = {}
  // const wxContext = cloud.getWXContext()
  await db.collection('snebUser').add({
    data: {
      _openid: OPENID,
      className: '',
      classSecret: ''
    }
  })
  return {
    snebUserAdd
  }
}
async function snebUserModify(event) {
  const { OPENID, APPID } = cloud.getWXContext() 
  const { className, classSecret } = event
  let banJiData = await db.collection('snebBanJi').get()
  //获取某一项
  let banJiDataClassSecret =  banJiData.data.filter(function(o){
    return o.className  ==className
  })
  if (banJiDataClassSecret[0].classSecret == classSecret ){
    await db.collection('snebUser').where({
      _openid: OPENID
    }).update({
      data: {
        className: className,
        classSecret: classSecret
      }
    })
    return {
      msg:'ok'
    }
  }else{
    return 
  }
 

}
exports.main = async(event, context) => {
  switch (event.action) {
    case 'snebUserSearch':
      {
        return await snebUserSearch(event)
      }
    case 'snebUserAdd':
      {
        return snebUserAdd(event)
      }
    case 'snebUserModify':
      {
        return snebUserModify(event)
      }
    default:
      {
        return
      }
  }
}