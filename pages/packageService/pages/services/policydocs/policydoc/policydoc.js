// pages/services/policydoc/policydoc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    policydoc: {
      imgUrl: "https://placeimg.com/640/480/any",
      content: [{
        policydoc_id: 1,
        title: "标题一21111111111111111111111342edsdsd",
        desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",//描述或者说简介，内容是另外一部分
        time: "2020-05-06" //插入时间
      }, {
        policydoc_id: 1,
        title: "标题一21111111111111111111111342edsdsd",
        desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        time: "2020-05-06"
      }, {
        policydoc_id: 1,
        title: "标题一21111111111111111111111342edsdsd",
        desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        time: "2020-05-06"
      }, {
        policydoc_id: 1,
        title: "标题一21111111111111111111111342edsdsd",
        desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        time: "2020-05-06"
      }, {
        policydoc_id: 1,
        title: "标题一21111111111111111111111342edsdsd",
        desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        time: "2020-05-06"
      }
      ]
    },
    is_sear: false
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
        this.setData({
          is_sear: true
        })
        resolve([{ text: '标题', policydoc_id: 1, index: 3 }])
      }, 500)
    })
  },
  // 选择搜索结果事件
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  // 跳转事件
  onClickTapNav(e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/policydocs/policydocinfo/policydocinfo?id=' + e.currentTarget.dataset.id,
    })
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
