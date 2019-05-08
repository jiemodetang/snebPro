Page({

  /**
   * 页面的初始数据
   */
  data: {
    films: [],
    fromDataBase: [],
    hasMore: true,
    start: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSnebListDate()
  },
  getSnebListDate: function() {
    //还要修改的storge的逻辑
    
    const db = wx.cloud.database()
    // 查询当前用户所有的 snebClassBsdSnebInfor
    db.collection('snebClassBsdSnebInfor').where({
      _id: this.data.id
    }).get({
      success: res => {
        this.setData({
          fromDataBase: res.data[0].snebList,
          films: res.data[0].snebList
        })
        wx.setStorage({
          key: 'snebClassBsdSnebInfor',
          data: res.data[0].snebList,
          success: function (res) {
            console.log(res)
            console.log('----设置缓存成功----')
          }
        })
        console.log('[数据库] [查询记录] 成功: ')
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
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

  },
  onPullDownRefresh: function() {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
    var that = this
    this.getSnebListDate()
  },
  onReachBottom: function() {
    var that = this
    that.setData({
      films: [...this.data.films, ...this.data.fromDataBase]
    })
  },
  goSnebDetail: function(e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "../snebDetail/snebDetail?id=" + data.id
    })
  },
})