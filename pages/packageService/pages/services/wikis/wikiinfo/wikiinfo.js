// pages/services/wikis/wikis/wikis.js
const collect = require('../../../../../../utils/collect')
const like = require("../../../../../../utils/like.js")
const app = getApp()
const entityName='热门资讯'
//获得请求地址
const API_URL = app.globalData.API_URL;
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    that.init(options.id)

    //请求展示数据
    wx.request({
      url: API_URL + '/hot-info-user-view/getById',
      data: {
        hotInfoId: options.id
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          that.setData({
            hotInfo: data.data,
          })
          console.log(that.data)
        } else {
          wx.showToast({
            title: '请求数据失败！',
            icon:'error',
            mask:true
          })
        }
      }
    })
  },

  /**
   * 初始化收藏点赞数据
   * @param {*} id 
   */
  init:function(id){
    var _this = this
    like.getLikeCountByDataId(entityName,id).then((value)=>{
      _this.setData({
        likeCount: value
      })
    })

    like.getIsLikeByUserId(entityName,id).then((value)=>{
      _this.setData({
        isLike: value
      })
    })
    
    collect.getCollectCountByDataId(entityName,id).then((value)=>{
      _this.setData({
        collectCount: value
      })
    })

    collect.getIsCollectByUserId(entityName,id).then((value)=>{
      _this.setData({
        isCollect: value
      })
    })
  },

  /**
   * 收藏、点赞事件
   * @param {*} e 
   */
  onClickGiveCollectShare(e) {
    var _this = this
    let hotInfo = _this.data.hotInfo
    let id=hotInfo.hotInfoId
    let data={
      userId:app.globalData.userId,
      entityName:entityName,
      dataId:hotInfo.hotInfoId,
      imgUrl:hotInfo.imgUrl,
      dataTitle:hotInfo.hotInfoTitle,
      dataDesc:hotInfo.hotInfoDesc
    }
    switch (e.currentTarget.id) {
      case "isLike":
        _this.likeClick(data,id)
        break
      case "isCollect":
        _this.collectClick(data,id)
        break
      default:
        break
    }
  },

  /**
   * 点赞事件
   * @param {*} data 
   * @param {*} id 
   */
  likeClick(data,id){
    var _this=this
    var count = _this.data.likeCount
        if (!_this.data.isLike) {
          like.likeClick(data).then((value)=>{
            if (value) {
              count++
              _this.setData({
                isLike: !_this.data.isLike,
                likeCount: count
              })
              wx.showToast({
                title: '点赞成功！',
              })
            } else {
              wx.showToast({
                title: '点赞失败！',
                icon:'error',
                mask:true
              })
            }
          })
        } else {
          like.likeCancel(entityName,id).then((value)=>{
            if (value) {
              count--
              _this.setData({
                isLike: !_this.data.isLike,
                likeCount: count
              })
              wx.showToast({
                title: '取消成功！',
              })
            } else {
              wx.showToast({
                title: '取消失败！',
                icon:'error',
                mask:true
              })
            }
          })
        }
  },

  /**
   * 收藏事件
   * @param {*} data 
   * @param {*} id 
   */
  collectClick(data,id){
    var _this=this
    var count=_this.data.collectCount
    if (!_this.data.isCollect) {
      collect.collectClick(data).then((value)=>{
        if (value) {
          count++
          wx.showToast({
            title: '收藏成功！',
          })
          _this.setData({
            isCollect: !_this.data.isCollect,
            collectCount: count
          })
        } else {
          wx.showToast({
            title: '收藏失败！',
            icon:'error',
            mask:true
          })
        }
      })
    } else {
      collect.collectCancel(entityName,id).then((value)=>{
        if (value) {
          count--
          _this.setData({
            isCollect: !_this.data.isCollect,
            collectCount: count
          })
          wx.showToast({
            title: '取消成功！',
          })
        } else {
          wx.showToast({
            title: '取消失败！',
            icon:'error',
            mask:true
          })
        }
      })
    }
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