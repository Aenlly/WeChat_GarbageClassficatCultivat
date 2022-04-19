// pages/mines/integexcuhs/integexcuhinfo/integexcuhinfo.js
const user = require("../../../../utils/user.js")
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
var id = ''
var userId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}, //显示内容
    //资源请求地址
    API_RES_URL: app.globalData.API_RES_URL,
    tel: 13183365641,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    id = options.id
    if (id == '' || id == null) {
      wx.showToast({
        title: '请求异常！',
        icon: 'error'
      })
      wx.navigateBack({
        delta: 1,
      })
    }
    userId = app.globalData.userId
    console.log("userid:" + userId)
    if (userId == '' || userId == null) {
      wx.showToast({
        title: '请先登录！',
        icon: 'error'
      })
      return
    } else {
      this.getById();
    }
  },
  // 获取礼品信息
  getById() {
    var _this = this
    wx.request({
      url: API_URL + '/gift-list-view/getById/' + id,
      success(res) {
        let data = res.data
        if (data.code == 200) {
          console.log(data.data)
          _this.setData({
            info: data.data
          })
        }
      }
    })
  },

  /*兑换事件 */
  exchangeClick() {
    var _this = this
    let userInfo = app.globalData.userInfo
    console.log(userInfo)
    if (userInfo.remainingPoints < _this.data.info.point) {
      wx.showToast({
        title: '积分不足！',
        icon: 'error'
      })
    } else if (_this.data.info.number == 0) {
      wx.showToast({
        title: '库存不足！',
        icon: 'error'
      })
    } else {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '确认兑换？',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: API_URL + '/gift/convertById/' + id,
              method: 'PUT',
              header: {
                'token': userId
              },
              success(res) {
                let data = res.data
                console.log(data)
                if (data.code == 200) {
                  console.log(_this.data.info)
                  _this.data.info.number = _this.data.info.number - 1
                  //更新用户信息
                  user.getUserById()
                  wx.showModal({
                    cancelColor: 'cancelColor',
                    title: "兑换码",
                    content: data.data,
                    showCancel: false,
                  })
                } else if (data.code == 400) {
                  wx.showToast({
                    title: '积分不足！',
                    icon: 'error'
                  })
                } else if (data.code == 403) {
                  wx.showToast({
                    title: '请重新登录授权！',
                    icon: 'error'
                  })
                  wx.clearStorage()
                  //登录状态
                  wx.setStorage({
                    key: "hasUserInfo",
                    data: false
                  })
                } else {
                  wx.showToast({
                    title: '兑换请求异常！',
                    icon: 'error'
                  })
                }
              }
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