// pages/indexs/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searList: [{
      garbageName: "苹果",
      type: "厨余垃圾"
    }, {
      garbageName: "苹果",
      type: "可回收垃圾"
    }, {
      garbageName: "苹果",
      type: "有害垃圾"
    }, {
      garbageName: "苹果",
      type: "其他垃圾"
    }]
  },

  // 搜索取消事件
  bindclearSear: function (e) {
    this.setData({
      is_sear: false
    })
  },
  // 搜索事件
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var list = [{
          garbageName: "垃圾袋",
          type: "厨余垃圾"
        }, {
          garbageName: "垃圾袋",
          type: "可回收垃圾"
        }, {
          garbageName: "垃圾袋",
          type: "有害垃圾"
        }, {
          garbageName: "垃圾袋",
          type: "其他垃圾"
        }]
        this.setData({
          searList: list
        })
        console.log(this.data)
      }, 500)
    })
  },
  // 选择搜索结果事件
  selectResult: function (e) {
    console.log('select result', e.detail)
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