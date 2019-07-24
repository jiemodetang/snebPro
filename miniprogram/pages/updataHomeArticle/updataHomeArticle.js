// miniprogram/updataHomeArticle/updataHomeArticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue: "",
    pleaseEnterTitle: "",
    pleaseEnterAuthor:"",
    textareaValueLength:2000
  },
  
  pleaseEnterAuthor(e){
    this.setData({
      pleaseEnterAuthor: e.detail.value
    })
  },
  pleaseEnterTitle(e) {
    this.setData({
      pleaseEnterTitle: e.detail.value
    })
  },
  bindinput(e) {
    const { textareaValue, textareaValueLength} =  this.data
    if (textareaValue.length == textareaValueLength){
      wx.showToast({
        icon: 'none',
        title: '超出字数上限'
      })
    }
    this.setData({
      textareaValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})