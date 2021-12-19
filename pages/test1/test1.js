// pages/test1/test1.js
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL=app.globalData.API_URL;
const entityName = '变废为宝'
var userId=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
        //资源请求地址
        API_RES_URL: getApp().globalData.API_RES_URL,
  },
    /**
   * 判断是否登录用户
   */
  isLogin() {
    if (userId == null || userId == '') {
      wx.showToast({
        title: '请先登录！',
        mask: true
      })
      return false
    }
    return true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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