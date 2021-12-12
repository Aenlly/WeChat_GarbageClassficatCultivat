// pages/services/wiki/wiki.js
const app=getApp()
//获得请求地址
const API_URL=app.globalData.API_URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL:getApp().globalData.API_RES_URL,
    hotInfo: [{
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
    var that=this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.request({
          url: API_URL+'/hot-info-user-view/getByTitle',
          data:{
            title: value
          },
          success(res){
            var data=res.data
            console.log(data)
            that.setData({
              is_sear: true,
            })
            //增加text字段，用于显示
            for(let i=0;i<data.data.length;i++){
              data.data[i].text=data.data[i].hotInfoTitle
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
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wikis/wikiinfo/wikiinfo?id='+e.detail.item.hotInfoId,
    })
  },
  //跳转详情事件
  onClicktapNav:function(e){
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wikis/wikiinfo/wikiinfo?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: API_URL+'/hot-info-user-view/get',
      success(res){
        let data=res.data
        if(data.code==200){
          that.setData({
            hotInfo:data.data,
            search: that.search.bind(this),
            is_sear: false
          })
        }else{
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