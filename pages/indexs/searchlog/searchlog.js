// pages/indexs/searchlog/searchlog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchs: [{
      searchName: "苹果",
      searchType: "文本搜索"
    }, {
      searchName: "苹果",
      searchType: "语音搜索"
    }, {
      searchName: "苹果",
      searchType: "图片识别"
    }, {
      searchName: "苹果",
      searchType: "图片识别"
    }, {
      searchName: "苹果",
      searchType: "文本搜索"
    }, {
      searchName: "苹果",
      searchType: "语音搜索"
    }]
  },
  // 搜索事件
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setData({
          searchs: []
        })
      }, 500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
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