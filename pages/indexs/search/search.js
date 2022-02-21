// pages/indexs/search/search.js
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL=app.globalData.API_URL;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'搜索',
    type:'文字搜索', //搜索类型，默认文本搜索
  },

  // 搜索取消事件
  bindclearSear: function (e) {
    this.setData({
      is_sear: false
    })
  },
  // 搜索事件
  search: function (value) {
    var _this=this
    if(value==null||value==''){
      return null
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.request({
          url: API_URL+'/search/getSearchText',
          header:{
            'token': app.globalData.userId
          },
          data:{
            name:value,
            type:this.data.type
          },
          success(res){
            let data=res.data
            if(data.code==200){
              _this.setData({
                searchList:data.data
              })
              console.log(data.data)
            }else{
              wx.showToast({
                title: '该识别未收录',
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
    if(options.name!=null){
      this.setData({
        value:options.name,
        type:options.type!=null?options.type:this.data.type
      })
      this.search(options.name)
    }
    this.setData({
      search: this.search.bind(this),
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