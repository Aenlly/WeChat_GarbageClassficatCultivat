// pages/indexs/searchlog/searchlog.js
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
const userId = app.globalData.userId
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  // 搜索事件
  search: function (value) {
    var _this=this
    return new Promise(() => {
      setTimeout(() => {
        wx.request({
          url: API_URL+'/search/getSearchByName',
          data:{
            name:value,
            userId:userId
          },
          success(res){
            let data=res.data
            if(data.code==200){
            _this.setData({
              searchs:data.data
            })
          }else{
            wx.showToast({
              title: '搜索失败！',
              icon:'error'
            })
          }
          }
        })
      }, 500)
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    if (userId == null) {
      wx.showToast({
        title: '请先登录！',
        icon:'error'
      })
    } else {
      wx.request({
        url: API_URL + '/search/get',
        header:{
          'token': userId
        },
        success(res){
          let data=res.data
          if(data.code){
            _this.setData({
              searchs:data.data,
              search: _this.search.bind(this)
            })
          }else{
            wx.showToast({
              title: '请求数据失败！',
              icon:'error'
            })
          }
        }
      })
    }
  },

  onClickSearch:function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/indexs/search/search?name='+e.currentTarget.dataset.name,  
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