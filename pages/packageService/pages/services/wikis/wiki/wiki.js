// pages/services/wiki/wiki.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wiki: [{
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    },
    {
      wiki_id: 0,
      wiki_title: "标题一",
      wiki_context: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      imgurl: "/images/index/textsear.png"
    }
    ]
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
        resolve([{ text: '标题', wiki_id: 1, index: 3 }])
      }, 500)
    })
  },
  // 选择搜索结果事件
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  //跳转详情事件
  onClicktapNav:function(e){
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wikis/wikiinfo/wikiinfo?wiki_id='+e.currentTarget.dataset.id,
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
    this.onLoad()
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