// miniprogram/pages/snebMe/snebMe.js
const _ = require('../../libs/loadsh.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    userInfo: {},
    userNickName: '',
    logged: false,
    takeSession: false,
    requestResult: '',
    grids: [{
      "gridSelect": '个人',
      "fn": '',
      "backImage":'../../img/wode.png'
      }, {
          "gridSelect": '集体',
          "fn": '',
          "backImage": '../../img/ziyuan.png'
      }, {
          "gridSelect": '系统',
          "fn": '',
          "backImage": '../../img/xiaoxi.png'
      }],
    cells: [
      [{
        title: '班级资料',
        text: '',
        access: true,
        // viewPersonInfo
        fn: ''
      }],
      [{
          title: '文章编写',
          text: '',
          access: true,
        // updataHomeArticle
        fn: ''
        },

      ],
      [{
        title: '位置选择',
        text: '',
        access: true,
        fn: 'updateLocation'
      }],
      [{
        title: '关于',
        text: '',
        access: true,
        fn: ''
      }]
    ],
    //CLASS的数组
    classArray: [],
    //CLASS的索引
    index: 0,
    //CLASS的某一个
    classArrayIndex: '',
    hiddenmodalput: true,
    openid: '',
    inputValue: '',
    canSelectClass: true
  },
  onReady: function() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let that = this
    new Promise(function(resolve, reject) {
      that.classList(resolve)
    }).then(() => {
      that.getUserInfor()
    })

    //获取class的列表

    //登录用openId查这个人记录到表里
    // that.toLogin()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                userNickName: res.userInfo.nickName
              })
              
              app.globalData.avatarUrl = res.userInfo.avatarUrl,
                app.globalData.userInfo = res.userInfo,
                app.globalData.userNickName = res.userInfo.nickName


            }
          })
        }
      }
    })

  },
  viewPersonInfo: function() {
    console.log(1111)
    wx.navigateTo({
      url: "../snebUpload/snebUpload"
    })
  },
  updateLocation: function() {
    wx.navigateTo({
      url: "../updateLocation/updateLocation"
    })
  }, 
  updataHomeArticle: function() {
    wx.navigateTo({
      url: "../updataHomeArticle/updataHomeArticle"
    })
  },
  clearStorage: function() {

  },
  viewAbount: function() {
    // wx.redirectTo({
    //   url: "../index/index"
    // })
  },
  //选择class
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      classArrayIndex: this.data.classArray[e.detail.value],
      hiddenmodalput: !this.data.hiddenmodalput,
    })

  },
  classList: function(resolve) {
    let that = this
    wx.cloud.callFunction({
      name: 'snebBanJi',
      data: {},
      success: function(res) {
        const classArrayData = _.get(res, 'result.snebBanJi.data', [])
        const classArrayMap = _.map(classArrayData, 'className', '')
        // console.log(classArrayMap)
        that.setData({
          classArray: classArrayMap
        })
        resolve()
      }
    })
  },
  getUserInfor() {
    let that = this
    // 查看当前用户表
    wx.cloud.callFunction({
      name: 'snebUser',
      data: {
        _openid: app.globalData.openid,
        action: 'snebUserSearch'
      }
    }).then(res => {
      const data = _.get(res, 'result.snebUser.data', {})
      // console.log(JSON.stringify(data))
      const belongClass = _.get(data[0], 'belongClass', '')
      const className = _.get(data[0], 'className', '')
      if (className) {
        that.setData({
          index: _.findIndex(that.data.classArray, function(o) {
            return o == className;
          })
        })
        console.log(that.data.classArray, that.data.index, className)
      }
      // console.log(data,1111)
      //看看这个人有没有在snebUser表里，没有就插入
      if (_.isEmpty(data)) {
        wx.cloud.callFunction({
          name: 'snebUser',
          data: {
            action: 'snebUserAdd'
          }
        })
      } else {
        //让他的class能不能选择
        //看看这个人有没有在snebUser表里,有CLASS呢就让它能看INFOE,
        if (className) {
          that.setData({
            canSelectClass: false
          })
        }
      }
    })
  },
  toLogin: function() {
    // 调用云函数
    let that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        that.setData({
          openid: res.result.openid
        })


      },
      fail: err => {}
    })

    // const db = wx.cloud.database()
    // // 查询当前用户所有的 snebBanJi
    // db.collection('snebBanJi').where({
    //   _id: this.data.id
    // }).get({
    //   success: res => {
    //     console.log(res.data);
    //     // this.setData({
    //     //   queryResult: JSON.stringify(res.data, null, 2)
    //     // })
    //     console.log('[数据库] [查询记录] 成功: ')
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  },
  //选class
  gridsArray1: function() {
    // this.setData({
    //   hiddenmodalput: !this.data.hiddenmodalput,
    // })
  },
  //picker的确认
  bindchange() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
    })
  },
  //弹窗取消
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },

  //弹窗提交
  confirm: function() {
    let that = this
    const {
      inputValue,
      classArray,
      index
    } = this.data
    console.log(inputValue)
    if (!inputValue) {
      return
    } else {
      wx.cloud.callFunction({
        name: 'snebUser',
        data: {
          classSecret: inputValue,
          className: classArray[index],
          action: 'snebUserModify'
        },
        success(res) {
          const {
            inputValue,
            classArray,
            index
          } = that.data
          const {
            result = {}
          } = res
          if (_.isEmpty(result)) {
            wx.showModal({
              content: '秘钥连接失败',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
          }else{
            wx.showToast({
              title: '已完成',
              icon: 'success',
              duration: 3000
            });
            that.setData({
              canSelectClass:false
            })
          }
        }
      })
    }
    this.setData({
      hiddenmodalput: true,
    })
  },
  //授权
  onGetUserInfo: function(e) {
    this.setData({
      avatarUrl: e.detail.userInfo.avatarUrl,
      userInfo: e.detail.userInfo,
      userNickName: e.detail.userInfo.nickName
    })
    app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
    app.globalData.userInfo = e.detail.userInfo,
      app.globalData.userNickName = e.detail.userInfo.nickName

  },
  bindinputChange:function(e){
    var val = e.detail.value;
    this.setData({
      inputValue: val
    });
  }
})