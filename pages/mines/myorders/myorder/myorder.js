// pages/mines/myorder/myorder.js
const API_URL=getApp().globalData.API_URL;
const userId=getApp().globalData.userId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      title: "未核销",
      orders: [] //未核销订单
    }, {
      title: "已核销",
      orders: [] //已核销订单
    }],
    activeTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(userId==null||userId==''){
      wx.showToast({
        title: '请先登录！',
        icon:'error'
      })
    }else{
      this.getOrderUserList('未核销',0)
      this.getOrderUserList('已核销',1)
    }
  },

  /**
   * 请求订单记录
   * @param {*订单状态} state 
   * @param {*本地索引} index 
   */
  getOrderUserList(state,index){
    var _this=this
    wx.request({
      url: API_URL+'/order-user-view/getOrderUserList/'+userId+'/'+state,
      success(res){
        let data=res.data
        if(data.code==200){
          console.log(data)
          _this.setData({
            ["tabs["+index+"].orders"]:data.data
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