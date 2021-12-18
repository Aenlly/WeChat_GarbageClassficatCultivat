// pages/services/wastetrea/wastetrea.js
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL
var userId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    tabs: [{
        title: "好用", //与枚举对应
        WasteTurnTreasures: [] //变废为宝信息
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
    //查询信息
    this.getListByTag(index)
  },
  // 卡片跳转事件
  onClickNav(e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wastetreas/wastetreainfo/wastetreainfo?id=' + e.currentTarget.dataset.id,
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
    console.log(value)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setData({
          is_sear: true
        })
        wx.request({
          url: API_URL + '/waste-turn-treasure/getListSearchByTitle/' + value,
          success(res) {
            let data = res.data
            if (data.code == 200) {
              resolve(data.data)
            } else {
              wx.showToast({
                title: '搜索请求异常！',
                icon: 'error'
              })
            }
          },
          fail() {
            wx.showToast({
              title: '搜索失败！',
              icon: 'error'
            })
          }
        })
      }, 500)
    })
  },
  // 选择搜索结果事件
  selectResult: function (e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wastetreas/wastetreainfo/wastetreainfo?id=' + e.detail.item.id,
    })
  },
  // 我的事件跳转
  clickMy: function () {
    if (this.isLogin()) {
      wx.navigateTo({
        url: '/pages/packageService/pages/services/wastetreas/wastetreamy/wastetreamy'
      })
    }
  },
  // 发布事件跳转
  clickPublish: function () {
    if (this.isLogin()) {
      wx.navigateTo({
        url: '/pages/packageService/pages/services/wastetreas/wastetreapublish/wastetreapublish'
      })
    }
  },
  // 我的收藏事件跳转
  clickCollect: function () {
    if (this.isLogin()) {
      wx.navigateTo({
        url: '/pages/packageService/pages/services/wastetreas/wastetreacollect/wastetreacollect'
      })
    }
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
  getListByTag(index) {
    userId = app.globalData.userId
    var _this = this
    wx.request({
      url: API_URL + '/waste-turn-treasure/getListByTag/' + index,
      success(res) {
        let data = res.data
        if (data.code == 200) {
          console.log(data.data)
          _this.setData({
            ["tabs[" + index + "].WasteTurnTreasures"]: data.data
          })
        } else {
          wx.showToast({
            title: '请求数据异常！',
            icon: 'error'
          })
        }
      }
    })
  },

  /**
   * 判断是否登录用户
   */
  isLogin() {
    if (userId == null || userId == '') {
      wx.showToast({
        title: '请先登录！',
        mask: true
      })
      return false
    }
    return true
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