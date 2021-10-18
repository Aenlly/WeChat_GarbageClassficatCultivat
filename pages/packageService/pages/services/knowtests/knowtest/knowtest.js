// pages/services/knowtest/knowtest.js
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
    testrank: [{
      nickname: "浮动四大",
      imageUrl: "https://placeimg.com/640/480/any",
      integcount: "151541",
    }, {
      nickname: "浮动四大",
      imageUrl: "https://placeimg.com/640/480/any",
      integcount: "151541",
    }, {
      nickname: "浮动四大",
      imageUrl: "https://placeimg.com/640/480/any",
      integcount: "151541",
    }, {
      nickname: "浮动四大",
      imageUrl: "https://placeimg.com/640/480/any",
      integcount: "151541",
    }, {
      nickname: "浮动四大",
      imageUrl: "https://placeimg.com/640/480/any",
      integcount: "151541",
    }, {
      nickname: "浮动四大",
      imageUrl: "https://placeimg.com/640/480/any",
      integcount: "151541",
    }, {
      nickname: "浮动四大",
      imageUrl: "https://placeimg.com/640/480/any",
      integcount: "151541",
    }, {
      nickname: "浮动四大",
      imageUrl: "https://placeimg.com/640/480/any",
      integcount: "151541",
    }]
  },
  // 操作栏跳转事件
  onClickNav: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
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
