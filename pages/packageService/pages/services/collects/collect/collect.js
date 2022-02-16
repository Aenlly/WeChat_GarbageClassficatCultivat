// pages/services/collect/collect.js
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL=app.globalData.API_URL;
var userId=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [{
      title: "标题sjdn",
      content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      tag: "视频"
    }, {
      title: "标题sjdnajsnda是否实打实大苏打标题sjdnajsnda是否实打实大苏打",
      content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      tag: "视频"
    }]
  },
  // 搜索取消事件
  bindclearSear: function (e) {
    this.searchBy(userId,'')
  },
  // 搜索事件
  search: function (value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.searchBy(userId,value)
      }, 500)
    })
  },
  // 选择搜索结果事件
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  onClickUrl(e) {
    var _this = this
    // 获取点击的值
    let data=_this.data.collects[e.currentTarget.dataset.index]
    let url=''
    if(data.entityName=='热门资讯'){
      url='/pages/packageService/pages/services/wikis/wikiinfo/wikiinfo?id='
    }
    if(data.entityName=='公益视频'){
      url='/pages/packageService/pages/services/welfvideos/welfvideoinfo/welfvideoinfo?id='
    } 
    if(data.entityName=='变废为宝'){
      url='/pages/packageService/pages/services/wastetreas/wastetreainfo/wastetreainfo?id='
    }
    wx.navigateTo({
      url: url+data.dataId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userId=app.globalData.userId
    if(userId==null||userId==''){
      wx.showToast({
        title: '请先登录！',
        icon:'error'
      })
    }else{
      this.searchBy(userId,'')
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
  searchBy:function(userId,name){
    var _this=this
    wx.request({
      url: API_URL+'/collect-entity/getByUserId',
      data:{
        userId:userId,
        name:name
      },
      success(res){
        let data=res.data
        if(data.code==200){
          console.log(data)
          _this.setData({
            collects:data.data,
          })
        }else{
          wx.showToast({
            title: '请求数据错误！',
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
