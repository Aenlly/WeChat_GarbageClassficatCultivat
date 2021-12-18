// pages/services/wastetrea/wastetrea.js
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL
var userId=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
        //资源请求地址
        API_RES_URL: getApp().globalData.API_RES_URL,
    tabs: [{
      title: "好用",
      WasteTurnTreasures: [{
        wastetrea_id: 0,
        text: "小程序开发进阶",
        textDesc: "本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。",
        imgUrl: "http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg",
        tag: 0,
        user_id: 1
      }, {
        wastetrea_id: 0,
        title: "小程序开发进阶",
        desc: "本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。",
        imgUrl: "http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg",
        tag: 0,
        user_id: 1
      }]
    },
    {
      title: "好看"
    },
    {
      title: "好玩"
    }
    ],
    activeTab: 0,
  },
  // 选项卡标题单击事件
  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    this.getListByTag(index)
  },
  // 卡片跳转事件
  onClickNav(e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wastetreas/wastetreainfo/wastetreainfo?id=' + e.currentTarget.dataset.index,
    })
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
  // 我的事件跳转
  clickMy: function () {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wastetreas/wastetreamy/wastetreamy'
    })
  },
  // 发布事件跳转
  clickPublish: function () {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wastetreas/wastetreapublish/wastetreapublish'
    })
  },
  // 我的收藏事件跳转
  clickCollect: function () {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wastetreas/wastetreacollect/wastetreacollect'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListByTag(this.data.activeTab)
    this.setData({
      search: this.search.bind(this),
      is_sear: false
    })
  },

  /**
   * 查询信息
   * @param {选项卡索引} index 
   */
  getListByTag(index){
    userId=app.globalData.userId
    var _this=this
    wx.request({
      url: API_URL+'/waste-turn-treasure/getListByTag/'+index,
      success(res){
        let data=res.data
        if(data.code==200){
          console.log(data.data)
          _this.setData({
            ["tabs["+index+"].WasteTurnTreasures"]:data.data
          })
        }else{
          wx.showToast({
            title: '请求数据异常！',
            icon:'error'
          })
        }
      }
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