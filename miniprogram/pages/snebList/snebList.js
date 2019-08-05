const _ = require('../../libs/loadsh.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    films: [],
    fromDataBase: [],
    hasMore:  false,      
    start: 0,
    skipData: 0,
    limitData: 4
  },
  /**
   * 生命周期函数-W-监听页面加载
   */
  onLoad: function(options) {
    this.getSnebListDate()
  },
  getSnebListDate: function(from) {
    //还要修改的storge的逻辑
    // 查询当前用户所有的 snebClassBsdSnebInfor
    const {
      skipData,
      limitData
    } = this.data
    wx.cloud.callFunction({
      name: 'snebClassInfor',
      data: {
        action: "snebClassInforGet",
        skipData: skipData,
        limitData: limitData
      },
      success: res => {
        const {
          data = []
        } = res.result.snebClassBsdSnebInforData//总是拿不到数据，本地打个断点就会有数据，之前出现的几次，解决办法，就是上传一下函数啥的就好了，心态爆炸了 ，取点好吃哈哈哈哈哈哈
        console.log(data, skipData)
        if (!_.isEmpty(data)) {
          if (from == "top"){
            this.setData({
              films: [ ...data]
            })
          }else{
            this.setData({
              films: [...this.data.films, ...data]
            })
          }
       
          wx.setStorage({
            key: 'snebClassBsdSnebInfor',
            data: [...this.data.films, ...data],
            success: function(res) {
              console.log('----设置缓存成功----')
            }
          })
        }
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }

    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onPullDownRefresh: function() {
    this.setData({
      skipData: 0
    }, function() {
      wx.showToast({
        title: '数据加载中',
        icon: 'loading',
        duration: 1000
      });
      var that = this
      //暂时干掉上拉刷新这块
      console.log(1111111111)
      this.getSnebListDate("top")
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    const {
      skipData
    } = this.data
    this.setData({
      skipData: this.data.skipData + 4
    }, function() {
      console.log(22222222)
      this.getSnebListDate()
    })
  },
  //跳转详情页
  goSnebDetail: function(e) {


    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "../snebDetail/snebDetail?id=" + data.id
    })
  },
})