const img1 = '../../img/timg.jpg'
Page({
  data: {
    imgUrls: [
      img1
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatorColor: '#747373',
    indicatorActiveColor: '#ffffff',
    circular: true,
    easingFunction: "easeInOutCubic"
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
  goIndexInforPage(){
    wx.navigateTo({
      url: "../indexInfor/indexInfor"
    })
  }
})