// pages/packageService/pages/services/knowtests/testhistory/testhistory.js
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL
var userId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        title: "每日答题",
        PaperTables: [{
          insert_time: "2021-05-22 14:22:36",
          score: "60"
        }, {
          insert_time: "2021-05-22 14:22:36",
          score: "60"
        }]
      },
      {
        title: "分类小考",
        PaperTables: [{
          insert_time: "2021-05-22 14:22:36",
          score: "60"
        }, {
          insert_time: "2021-05-22 14:22:36",
          score: "60"}]
      }
    ],
    activeTab: 0
  },
  // 选项卡单击事件
  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
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
        icon:"error",
        mask:true
      })
    }else{
      this.getPaperTablesLog(this.data.tabs[0].title,0)
      this.getPaperTablesLog(this.data.tabs[1].title,1)
    }
  },

  /**
   * 请求答题记录
   * @param {*问卷名称} questionnaireName 
   * @param {*tabs索引} index 
   */
  getPaperTablesLog(questionnaireName,index){
    var _this=this
    wx.request({
      url: API_URL+'/answer-question/getPaperTablesLog',
      data:{
        userId:userId,
        questionnaireName:questionnaireName
      },
      success(res){
        let data=res.data
        console.log(data.data)
        if(data.code==200){
          _this.setData({
            ["tabs["+index+"].PaperTables"]:data.data
          })
        }else{
          wx.showToast({
            title: '服务器异常！',
            icon:"error",
            mask:true
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