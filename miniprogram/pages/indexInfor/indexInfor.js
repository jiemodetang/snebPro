// miniprogram/pages/indexInfor/indexInfor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue:'',
    scarlett:{}
  },
  onLoad(options){
    // e.沙湾也来着indexforData
    console.log(options)
    this.setData({
      scarlett: JSON.parse(options.indexforData)
    })
 
  },
  bindinput(e){
    console.log(e)
    this.setData({
      textareaValue: e.detail.value
    })
  }
})