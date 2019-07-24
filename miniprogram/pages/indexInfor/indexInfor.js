// miniprogram/pages/indexInfor/indexInfor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue:'',

  },
  

  bindinput(e){
    console.log(e)
    this.setData({
      textareaValue: e.detail.value
    })
  }
})