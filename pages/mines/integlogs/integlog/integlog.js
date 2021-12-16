// pages/mines/integlog/integlog.js
// 获取应用实例
var app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
var userId = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        title: "增加",
      },
      {
        title: "减少",
      }
    ],
    activeTab: 0,
  },

  // 选项卡单击事件
  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userId = app.globalData.userId
    if (userId == null || userId == '') {
      wx.showToast({
        title: '请先登录',
      })
    } else {
      this.getByUserIdAndType(1, 0)
      this.getByUserIdAndType(-1, 1)
    }
  },

  /**
   * 查询用户积分记录
   * @param {*积分类型} type 
   * @param {*选项卡索引} index 
   */
  getByUserIdAndType(type, index) {
    var _this = this
    wx.request({
      url: API_URL + '/points-log/getByUserIdAndType',
      data: {
        userId: userId,
        type: type
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          console.log(data.data)
          _this.setData({
            ["tabs[" + index + "].pointsLog"]: data.data
          })
        } else {
          wx.showToast({
            title: '数据请求异常！',
          })
        }
      }
    })
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