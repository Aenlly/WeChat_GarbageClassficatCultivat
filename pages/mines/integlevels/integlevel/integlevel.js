// pages/mines/integlevels/integlevel/integlevel.js
// 获取应用实例
var app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    middleInfo: {
      integrank: {
        imgurl: "/images/mine/integrank.png",
        text: "积分排行",
        activity: "/pages/mines/integranks/integrank/integrank"
      },
      integdesc: {
        imgurl: "/images/mine/integdesc.png",
        text: "积分说明",
        activity: "/pages/mines/integdescs/integdesc/integdesc"
      },
      integexcuh: {
        imgurl: "/images/mine/integexcuh.png",
        text: "积分兑换",
        activity: "/pages/mines/integexcuhs/integexcuh/integexcuh"
      },
      integlog: {
        imgurl: "/images/mine/integlog.png",
        text: "积分记录",
        activity: "/pages/mines/integlogs/integlog/integlog"
      }
    },
  },
  onClickUrl: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.activity,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.globalData.userInfo
    if (userInfo.userId == null || userInfo.userId == '') {
      wx.showToast({
        title: '请先登录！',
      })
    } else {
      var _this = this
      _this.setData({
        userInfo: userInfo
      })
      //请求下一头衔
      wx.request({
        url: API_URL + '/points/getNextLevel/' + userInfo.accumulativePoints,
        success(res) {
          let data = res.data
          if (data.code == 200) {
            console.log(data.data)
            //计算差值
            let number = data.data.pointsRequire - userInfo.accumulativePoints
            //设置显示内容
            _this.setData({
              user: {
                //当前累积积分
                count: userInfo.accumulativePoints,
                //下一等级所需积分
                new_level: data.data.pointsRequire,
                //下一等级差值
                points: number,
                //下一等级名称
                pointsName: data.data.pointsName
              }
            })
          } else {
            wx.showToast({
              title: '数据异常！',
            })
          }
        }
      })
      console.log(userInfo)
      //请求头衔列表
      wx.request({
        url: API_URL + '/points/get',
        success(res) {
          let data = res.data
          if (data.code == 200) {
            console.log(data)
            _this.setData({
              points: data.data
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})