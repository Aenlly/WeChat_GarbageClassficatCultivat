// pages/services/wastetreas/wastetreacollect/wastetreacollect.js
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
const entityName = '变废为宝'
var userId = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    collects: [{
      wastetrea_id: 0,
      title: "小程序开发进阶",
      desc: "本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。",
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
    }],
  },

  // 卡片跳转事件
  onClickNav(e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wastetreas/wastetreainfo/wastetreainfo?id=' + e.currentTarget.dataset.id,
    })
  },
  // 搜索取消事件
  bindclearSear: function (e) {
    this.searchBy(userId, '')
  },
  // 搜索事件
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.searchBy(userId, value)
      }, 500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userId = app.globalData.userId
    if (userId == null || userId == '') {
      wx.showToast({
        title: '请先登录！',
        icon: 'error'
      })
    } else {
      this.searchBy(userId, '')
    }
    this.setData({
      search: this.search.bind(this),
    })
  },

  /**
   * 根据条件进行搜索，name参数不加则查询全部
   * @param {用户编号}} userId 
   * @param {搜索条件} name 
   */
  searchBy: function (userId, name) {
    var _this = this
    wx.request({
      url: API_URL + '/collect-entity/getByUserIdAndEntityName',
      data: {
        userId: userId,
        name: name,
        entityName: entityName
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          console.log(data)
          _this.setData({
            collects: data.data,
          })
        } else {
          wx.showToast({
            title: '请求数据错误！',
            icon: 'error'
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