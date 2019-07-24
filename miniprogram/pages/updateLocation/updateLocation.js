// map.js
let schoolData = [{
    "id": 1,
    "name": "北京大学",
    "longitude": "116.316176",
    "latitude": "39.997741"
  },
  {
    "id": 2,
    "name": "西安科技大学",
    "longitude": "108.968176",
    "latitude": "34.239638"
  },
  {
    "id": 3,
    "name": "西北农林科技大学",
    "longitude": "108.075936",
    "latitude": "34.270661"
  }
]
Page({
  data: {
    centerX: 113.3245211,
    centerY: 23.10229,
    markers: [],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color:"#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
    controls: [{
      id: 1,
      iconPath: '/image/location-control.png',
      position: {
        left: 0,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function() {
    console.log('地图定位！')
    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude,
          markers: this.getSchoolMarkers()
        })
      }
    });
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e)
  },
  controltap(e) {
    console.log(e.controlId)
    this.moveToLocation()
  },
  getSchoolMarkers() {
    let markers = [];
    for (let item of schoolData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  bindtap(e) {
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        //选择地点之后返回的结果
        const { address, latitude, longitude, name} = res
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../../img/location.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 25,
      height: 48
    };
    return marker;
  }
})