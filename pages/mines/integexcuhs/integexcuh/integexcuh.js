// pages/mines/integexcuhs/integexcuh/integexcuh.js
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    banner: '/gift/banner/87bcbcde-8694-4fc7-8f36-7a5f1f2218e9.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGiftView('', -1)

    var _this = this
    wx.request({
      url: API_URL + '/gift-type/getUserGiftTypeList',
      success(res) {
        let data = res.data
        if (data.code == 200) {
          console.log(data)
          _this.setData({
            giftTypes: data.data
          })
        } else {
          wx.showToast({
            title: '请求数据异常！',
            icon:'error'
          })
        }
      }
    })
  },

  // 搜索取消事件
  bindclearSear: function (e) {
    this.getGiftView('', -1)
  },
  // 搜索事件
  search: function (value) {
    var _this = this
    if (value == null || value == '') {
      return
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        _this.getGiftView(value, -1)
      }, 500)
    })
  },

  /**
   * 根据名称与类型查询礼品信息，为空则查询全部
   * @param {礼品名称} name 
   * @param {礼品类型} type 
   */
  getGiftView(name, type) {
    var _this = this
    wx.request({
      url: API_URL + '/gift-list-view/getUserGiftView',
      data: {
        name: name,
        type: type
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          _this.setData({
            gifts: data.data,
            search: _this.search.bind(this),
          })
        } else {
          wx.showToast({
            title: '请求数据异常！',
            icon:'error'
          })
        }
      }
    })
  },

  /**
   * 根据垃圾类型查询礼品列表
   * @param {参数} e 
   */
  onClickType(e) {
    this.getGiftView('', e.currentTarget.dataset.id)
  },
  //跳转事件
  onClickTap(e){
    wx.navigateTo({
      url: '/pages/mines/integexcuhs/integexcuhinfo/integexcuhinfo?id='+e.currentTarget.dataset.id,
    })
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