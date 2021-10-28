// pages/mines/integlog/integlog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        title: "增加",
        integlog: [{
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }, {
          type: "增加",
          number: "20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }]
      },
      {
        title: "减少",
        integlog: [{
          type: "减少",
          number: "-20",
          desc: "每日答题",
          insert_time: "2021-05-06 14:29:44"
        }]
      }
    ],
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