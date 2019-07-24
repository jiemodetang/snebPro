// miniprogram/pages/snebUpload/snebUpload.js
const _ = require('../../libs/loadsh.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    files: [],
    zhuRenGong: '',
    checkboxItems: [{
        name: '帅气',
        value: '帅气'
      },
      {
        name: '爱篮球',
        value: '爱篮球'
      },
    ],
    checkboxItemsClone: [{
        name: '帅气',
        value: '帅气'
      },
      {
        name: '爱篮球',
        value: '爱篮球'
      },
      {
        name: '调皮',
        value: '调皮'
      },
      {
        name: '急',
        value: '急'
      },
      {
        name: '优秀',
        value: '优秀'
      },
      {
        name: '高冷',
        value: '高冷'
      },
      {
        name: '捣蛋',
        value: '捣蛋'
      },
      {
        name: '年少无知',
        value: '年少无知'
      },
      {
        name: '难兄难弟',
        value: '难兄难弟'
      },
      {
        name: '刺头',
        value: '刺头'
      },
      {
        name: '牛逼',
        value: '牛逼'
      }
    ],
    checkboxChangeData: [],
    pinFen: ["10", "9.0", "8.0", '7.0', '6.0', '5.0', '4.0', '3.0', '2.0', '0'],
    pinFenIndex: 0,
    paiZhaoShiJian: ['2019', '2018', '2017', '2016', '2015', '2014'],
    paiZhaoShiJianIndex: 0,
    filesFileIDMap: []

  },
  // 传入图片显示在页面上
  chooseImage: function(e) {
    var that = this;
    const {
      files
    } = that.data
    if (files.length == 6) {
      wx.showToast({
        icon: 'none',
        title: '最多上传10张'
      })
      return
    }
    wx.chooseImage({
      sizeType: ['original', ], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', ], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        console.log(res.tempFilePaths)

      }
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
      const cloudPath = "snebClassBsdSnebInfor/" + 'sneb' + new Date().getTime() + files[j].match(/\.[^.]+?$/)[0]
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

  // 多选
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail);
    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      checkboxChangeData: e.detail.value
    });
  },
  // 提交
  showTopTips() {
    const {
      zhuRenGong,
      pinFen,
      pinFenIndex,
      checkboxChangeData,
      files,
      showTopTips,
      filesFileIDMap,
      paiZhaoShiJian,
      paiZhaoShiJianIndex
    } = this.data
    let that = this
    if (zhuRenGong == '' || _.isEmpty(checkboxChangeData)) {
      that.setData({
        showTopTips: true
      })
      setTimeout(function() {
        that.setData({
          showTopTips: false
        });
      }, 1000);
      return
    }
    //调用上传图片的接口
    new Promise(function(resolve, reject) {
      that.uploadImage(resolve)
    }).then(function() {
      wx.cloud.callFunction({
        name: 'snebClassInfor',
        data: {
          action: "snebClassInforUpdate",
          average: pinFen[pinFenIndex],
          casts: filesFileIDMap,
          collect_count: Math.floor(Math.random() * (1 - 100) + 100),
          comment: [],
          genres: checkboxChangeData,
          images: filesFileIDMap[0],
          ratings_count: 0,
          title: zhuRenGong,
          year: paiZhaoShiJian[paiZhaoShiJianIndex]
        },
        success: res => {
          if (res.result) {
            wx.showToast({
              icon: 'success',
              title: '提交成功'
            })
          }

        },

      })
    })



  },
  zhuRenGongInput(e) {
    this.setData({
      zhuRenGong: e.detail.value
    })
  },
  pinFenChange: function(e) {
    this.setData({
      pinFenIndex: e.detail.value
    })
  },
  paiZhaoShiJianChange: function(e) {
    this.setData({
      paiZhaoShiJianIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      checkboxItems
    } = this.data
    this.setData({
      checkboxItems: checkboxItems.slice(0, 2)
    })
  },
  getMoreInfor() {
    const {
      checkboxItems,
      checkboxItemsClone
    } = this.data
    this.setData({
      checkboxItems: checkboxItemsClone
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