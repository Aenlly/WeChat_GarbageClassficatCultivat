// pages/services/activitlist/activitlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitlist: [
      {
        activity_id: 1,
        title: "dasmnfn地方就是那地方纳斯达克浮动浮动",
        desc: "大厦附近的奶粉是可能的fund附件为部队番号分红年度计划发给个红包机房的干部和附件发货的给你发几个标点符号改变",
        imgUrl: "https://placeimg.com/640/480/any",
        tag: "未开始",
      }, {
        activity_id: 1,
        title: "dasmnfn地方就是那地方纳斯达克浮动浮动",
        desc: "石室诗士施氏，嗜狮，誓食十狮。施氏时时适市视狮。十时，适十狮适市。是时，适施氏适市。施氏视是十狮，恃",
        imgUrl: "https://img.tcs.onein.cn/cldfactory/iasset/2dd0825c-dab8-46fa-b62f-9e73c9ba2748/17b7427b-46bb-4638-9ec9-34910a42a5a3.png",
        tag: "已结束",
      }, {
        activity_id: 1,
        title: "dasmnfn地方就是那地方纳斯达克浮动浮动",
        desc: "大厦附近的奶粉是可能的fund附件为部队番号分红年度计划发给个红包机房的干部和附件发货的给你发几个标点符号改变",
        imgUrl: "https://img.tcs.onein.cn/cldfactory/iasset/2dd0825c-dab8-46fa-b62f-9e73c9ba2748/17b7427b-46bb-4638-9ec9-34910a42a5a3.png",
        tag: "报名中",
      }, {
        activity_id: 1,
        title: "dasmnfn地方就是那地方纳斯达克浮动浮动",
        desc: "大厦附近的奶粉是可能的fund附件为部队番号分红年度计划发给个红包机房的干部和附件发货的给你发几个标点符号改变",
        imgUrl: "https://img.tcs.onein.cn/cldfactory/iasset/2dd0825c-dab8-46fa-b62f-9e73c9ba2748/17b7427b-46bb-4638-9ec9-34910a42a5a3.png",
        tag: "未开始",
      }, {
        activity_id: 1,
        title: "dasmnfn地方就是那地方纳斯达克浮动浮动",
        desc: "大厦附近的奶粉是可能的fund附件为部队番号分红年度计划发给个红包机房的干部和附件发货的给你发几个标点符号改变",
        imgUrl: "https://img.tcs.onein.cn/cldfactory/iasset/2dd0825c-dab8-46fa-b62f-9e73c9ba2748/17b7427b-46bb-4638-9ec9-34910a42a5a3.png",
        tag: "未开始",
      }, {
        activity_id: 1,
        title: "dasmnfn地方就是那地方纳斯达克浮动浮动",
        desc: "大厦附近的奶粉是可能的fund附件为部队番号分红年度计划发给个红包机房的干部和附件发货的给你发几个标点符号改变",
        imgUrl: "https://img.tcs.onein.cn/cldfactory/iasset/2dd0825c-dab8-46fa-b62f-9e73c9ba2748/17b7427b-46bb-4638-9ec9-34910a42a5a3.png",
        tag: "未开始",
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
        resolve([{ text: '标题', activit_id: 1, index: 3 }])
      }, 500)
    })
  },
  // 选择搜索结果事件
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  //跳转详情单击事件
  onClickNav: function (e) {
    wx.navigateTo({
      url: '/pages/services/activitys/activityinfo/activityinfo?id=' + e.currentTarget.dataset.index,
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