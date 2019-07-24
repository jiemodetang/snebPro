// miniprogram/pages/snebDetail/snebDetail.js
const app = getApp()
const _ = require('../../libs/loadsh.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showContent: true,
    snebDetail: {},
    hiddenmodalput: true,
    inputValue: "",
    optionsId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app)
    var that = this
    let snebDetailId = options.id
    wx.getStorage({
      key: 'snebClassBsdSnebInfor',
      success: function(res) {
        let snebClassBsdSnebInforData = res.data;
        console.log(snebClassBsdSnebInforData, snebDetailId)
        snebClassBsdSnebInforData.map((item, index) => {
          if (snebDetailId == item._id) {
            console.log(item)
            that.setData({
              snebDetail: item,
              optionsId: options.id
            })
            return
          }
        })
      },
    })
  },
  commentsFun() {
    this.setData({
      hiddenmodalput: false
    })
  },
  cancel() {
    this.setData({
      hiddenmodalput: true
    })
  },
  confirm() {
    var that = this
    const {
      inputValue,
      snebDetail,
      optionsId
    } = this.data

    var newSnebDetail = _.cloneDeep(snebDetail)


    wx.cloud.callFunction({
      name: 'snebDetail',
      data: {
        optionsId,
        content: inputValue,
        image: app.globalData.avatarUrl,
        name: app.globalData.userNickName,
        time: that.formatDateTime(new Date())
      },
      success: function(res) {
        if (res.result) {
          console.log(app)
          newSnebDetail.comment.push({
            content: inputValue,
            image: app.globalData.avatarUrl,
            name: app.globalData.userNickName,
            time: that.formatDateTime(new Date())
          })
          that.setData({
            snebDetail: newSnebDetail,
            hiddenmodalput: true
          })
        }

      }
    })
  },
  inputValueChange(e){
    var val = e.detail.value;
    this.setData({
      inputValue: val
    });
  },
  formatDateTime: function(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  previewImg(e){
    console.log(e.currentTarget.dataset.src)
    const { snebDetail } = this.data
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: snebDetail.casts// 需要预览的图片http链接列表
    })
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