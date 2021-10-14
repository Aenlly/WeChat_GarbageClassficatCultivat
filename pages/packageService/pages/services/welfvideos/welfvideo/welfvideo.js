// pages/services/welfvideo/welfvideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfvideolist: [
      {
        welfvideo_id: 0,
        title: "标题一",
        content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        imgurl: "/images/index/textsear.png",
        time: "2021-05-06 12:37:35"
      }
    ]
  },

  onClicktap(e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/welfvideos/welfvideoinfo/welfvideoinfo?id=',
    })
  },
  // 取消搜索函数
  bindclearSear: function (e) {
    this.setData({
      is_sear: false
    })
  },
  // 搜索事件
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setData({
          is_sear: true
        })
        /* json数据在组件文件中更改，miniprogram_npm\weui-miniprogram\searchbar\searchbar.wxml
        17行修改
         */
        resolve([{ text: '标题', value: 1, index: 3 }])
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
      search: this.search.bind(this),
      is_sear: false
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