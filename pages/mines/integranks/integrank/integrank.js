// pages/mines/integrank/integrank.js
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL=app.globalData.API_URL;
const userInfo=app.globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    wx.request({
      url: API_URL+'/user/getByPoint',
      success(res){
        let data=res.data
        if(data.code==200){
          console.log(data.data)
          _this.setData({
            userrank:data.data,
            userInfo:userInfo
          })
        }else{
          wx.showToast({
            title: '请求数据失败！',
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