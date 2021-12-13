// pages/services/welfvideo/welfvideo.js
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
  },

  // 取消搜索函数
  bindclearSear: function (e) {
    this.setData({
      is_sear: false
    })
  },
  // 搜索事件
  search: function (value) {
    var _this=this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.request({
          url: API_URL+'/video-user-view/getByTitle',
          data:{
            title: value
          },
          success(res){
            var data=res.data
            console.log(data)
            _this.setData({
              is_sear: true,
            })
            //增加text字段，用于显示
            for(let i=0;i<data.data.length;i++){
              data.data[i].text=data.data[i].videoTitle
            }
            //搜索结果显示
            resolve(data.data)
          }
        })
      }, 500)
    })
  },
  // 选择搜索结果事件
  selectResult: function (e) {
    console.log('select result', e.detail)
    wx.navigateTo({
      url: '/pages/packageService/pages/services/welfvideos/welfvideoinfo/welfvideoinfo?id='+e.detail.item.videoId,
    })
  },
  /**
   * 跳转详情页
   * @param {*} e 
   */
  onClicktap(e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/welfvideos/welfvideoinfo/welfvideoinfo?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.request({
      url: API_URL + '/video-user-view/get',
      success(res) {
        let data = res.data
        if (data.code == 200) {
          _this.setData({
            videoList: data.data,
            search: _this.search.bind(this),
            is_sear: false
          })
          console.log(data.data)
        } else {
          wx.showToast({
            title: '请求数据失败',
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