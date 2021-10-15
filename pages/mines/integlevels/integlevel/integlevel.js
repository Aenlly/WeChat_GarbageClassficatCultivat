// pages/mines/integlevels/integlevel/integlevel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    integlevel: [{
      title: "分类小白",
      number: 100,
    }, {
      title: "分类小将",
      number: 1000,
    }, {
      title: "分类小将",
      number: 1000,
    }, {
      title: "分类小将",
      number: 1000,
    }, {
      title: "分类小将",
      number: 1000,
    }, {
      title: "分类小将",
      number: 1000,
    }
    ],
    user: {
      count: 200,
      new_level: 1000,
      level: 800,
    }
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