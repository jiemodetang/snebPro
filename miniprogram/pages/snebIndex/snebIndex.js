const img1 = '../../img/timg.jpg'
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatorColor: '#747373',
    indicatorActiveColor: '#ffffff',
    circular: true,
    easingFunction: "easeInOutCubic"
  },
  onLoad(){
    wx.cloud.callFunction({
      name: 'updataHomeArticle',
      data: {
        action: "updataHomeArticleGet",
      },
      success: res => {
        const {data } = res.result.updataHomeArticleGetData
        console.log(res.result)
        if (res.result) {
          this.setData({
            imgUrls: data
          })
        }
      },

    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  goIndexInforPage(e){
    const { imgUrls} = this.data
    var data = e.currentTarget.dataset;
    console.log(imgUrls, data.index)
    wx.navigateTo({
      url: "../indexInfor/indexInfor?indexforData=" + JSON.stringify(imgUrls[data.index])
    })
  }
})