// miniprogram/updataHomeArticle/updataHomeArticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue: "",
    pleaseEnterTitle: "",
    pleaseEnterAuthor: "",
    textareaValueLength: 2000,
    files: [],
    filesFileIDMap: []
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  pleaseEnterAuthor(e) {
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
    const {
      textareaValue,
      textareaValueLength
    } = this.data
    if (textareaValue.length == textareaValueLength) {
      wx.showToast({
        icon: 'none',
        title: '超出字数上限'
      })
    }
    this.setData({
      textareaValue: e.detail.value
    })
  },

  // 上传图片
  uploadImage(resolve) {
    let that = this
    const {
      files,
      filesFileIDMap
    } = that.data
    for (var j = 0, lenJ = files.length; j < lenJ; ++j) {
      const filePath = files[j]
      wx.showLoading({
        title: '上传中',
      })
      // 上传图片
      const cloudPath = "snebHomeArticle/" + 'sneb' + new Date().getTime() + files[j].match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传文件] 成功：', res)
          that.setData({
            filesFileIDMap: filesFileIDMap.push(res.fileID)
          })
          resolve()
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }

  },
  submitInfor() {
    let that = this
    const {
      pleaseEnterTitle,
      pleaseEnterAuthor,
      textareaValue,
      filesFileIDMap
    } = this.data
    if (pleaseEnterTitle && pleaseEnterAuthor && textareaValue ){
      //调用上传图片的接口
      new Promise(function (resolve, reject) {
        that.uploadImage(resolve)
      }).then(function () {
        wx.cloud.callFunction({
          name: 'updataHomeArticle',
          data: {
            action:"updataHomeArticleUpdate",
            pleaseEnterTitle: pleaseEnterTitle,
            pleaseEnterAuthor: pleaseEnterAuthor,
            textareaValue: textareaValue,
            casts: filesFileIDMap,
          },
          success: res => {
            console.log(res.result)
            if (res.result) {
              wx.showToast({
                icon: 'success',
                title: '提交成功'
              })
            }
          },
          fail:res=>{
            wx.showToast({
              icon: 'none',
              title: '提交失败'
            })
          }
        })
      })
    }else{
      wx.showToast({
        icon: 'none',
        title: '部分未填'
      })
    }
  
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