// pages/services/knowtest/knowtest.js
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL
var userId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    knowtest: [{
      imageUrl: "/images/service/knowtest/dailyquizzes.png",
      text: "每日答题",
      activity: "/pages/packageService/pages/services/knowtests/answereveryday/answereveryday"
    }, {
      imageUrl: "/images/service/knowtest/classquiz.png",
      text: "分类小考",
      activity: "/pages/packageService/pages/services/knowtests/classquiz/classquiz"
    }, {
      imageUrl: "/images/service/knowtest/answerhistory.png",
      text: "答题历史",
      activity: "/pages/packageService/pages/services/knowtests/testhistory/testhistory"
    }, {
      imageUrl: "/images/service/knowtest/answerrules.png",
      text: "答题规则",
      activity: "/pages/packageService/pages/services/knowtests/testrules/testrules"
    }],
  },
  // 操作栏跳转事件
  onClickNav: function (e) {
    let text = e.currentTarget.dataset.text
    var _this = this
    if (_this.isLogin()) {
      if (text == '每日答题') {
        wx.request({
          url: API_URL + '/answer-question/getRandomBatchIndex',
          data: {
            userId: userId,
            naireName: text
          },
          success(res) {
            let data = res.data
            console.log(data)
            if (data.code == 200) {
              wx.navigateTo({
                url: e.currentTarget.dataset.url+"?index="+data.data,
              })
            } else if (data.code == 300) {
              wx.showToast({
                title: '今日已答题！',
              })
            } else {
              wx.showToast({
                title: '服务器异常！',
              })
            }
          }
        })
      } else if (text == '分类小考') {} else {
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    userId = app.globalData.userId
    _this.isLogin()
    //请求排名
    wx.request({
      url: API_URL + '/user/getByAnswerPoints',
      success(res) {
        let data = res.data
        if (data.code == 200) {
          console.log(data.data)
          _this.setData({
            userrank: data.data
          })
        }
      }
    })
  },

  /**
   * 判断是否登录用户
   */
  isLogin() {
    if (userId == null || userId == '') {
      wx.showToast({
        title: '请先登录！',
      })
      return false
    }
    return true
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