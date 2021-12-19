// pages/services/wastetreas/wastetreamy/wastetreamy.js
// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
var userId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    tabs: [{
        title: "已通过",
        WasteTurnTreasures: [{}]
      },
      {
        title: "待审核"
      },
      {
        title: "已下架"
      },
      {
        title: "未通过"
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
    this.getByUserIdAndAudit(this.data.activeTab)
  },
  // 卡片跳转事件
  onClickNav(e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/wastetreas/wastetreainfo/wastetreainfo?id=' + e.currentTarget.dataset.id,
    })
  },
  // 搜索取消事件
  bindclearSear: function (e) {
    this.getByUserIdAndAudit(this.data.activeTab)
  },
  // 搜索事件
  search: function (value) {
    var _this=this
    if(this.isLogin()){return}
    return new Promise(() => {
      setTimeout(() => {
        wx.request({
          url: API_URL+'/waste-turn-treasure/getListSearchByUserIdAndTitle/'+userId+'/'+value,
          success(res){
            let data=res.data
            console.log(data)
            if(data.code==200){
              _this.setData({
                ["tabs[" + _this.data.activeTab + "].WasteTurnTreasures"]: data.data
              })
            }else{
              wx.showToast({
                title: '请求数据异常！',
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
    userId=app.globalData.userId
    if(this.isLogin()){
      this.getByUserIdAndAudit(this.data.activeTab)
    }
    this.setData({
      search: this.search.bind(this),
    })
  },

  //删除信息
  onClickDelete(e){
    var _this=this
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'警告',
      content:'确认删除？删除后无法找回！',
      confirmColor: '#d9534f',
      success(res){
        if (res.confirm) {
          console.log('用户点击确定')
        wx.request({
          url: API_URL+'/waste-turn-treasure/deleteByUserIdAndId',
          method:'DELETE',
          data:{
            userId:userId,
            id:e.currentTarget.dataset.id
          },
          header:{
            'content-type': 'application/x-www-form-urlencoded' 
           },
          success(res){
            console.log(userId)
            let data=res.data
            if(data.code==200){
              wx.showToast({
                title: '删除成功！',
              })
              _this.getByUserIdAndAudit(this.data.activeTab)
            }else{
              wx.showToast({
                title: '删除失败！',
                icon:'error'
              })
            }
          }
        })
      }
      }
    })
  },

  //判断用户是否登录
  isLogin(){
    if(userId==null||userId==''){
      return false
    }
    return true
  },

  /**
   * @param {选项卡索引*} index 
   */
  getByUserIdAndAudit(index) {
    var _this=this
    wx.request({
      url: API_URL + '/waste-turn-treasure/getListByUserIdAndAudit',
      data:{
        userId:userId,
        audit:_this.data.tabs[index].title
      },
      success(res){
        let data=res.data
        console.log(data)
        if(data.code==200){
          _this.setData({
            ["tabs[" + index + "].WasteTurnTreasures"]: data.data
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
    this.getByUserIdAndAudit(this.data.activeTab)
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