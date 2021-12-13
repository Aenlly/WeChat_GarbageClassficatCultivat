// pages/services/wikis/wikis/wikis.js
const collect = require('../../../../../../utils/collect')
const like = require("../../../../../../utils/like.js")
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    give: {
      isgive: false,
      count: 2023,
    },
    collect: {
      iscollect: false,
      count: 2023,
    },
    wiki: {
      wiki_id: 0,
      wiki_title: "为什么要垃圾分类",
      wiki_context: ``,
      time: '2017-8-9' //发布时间，不是插入时间
    }
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let likeCount=like.getLikeCountByDataId(options.id)
    let isLike=like.getIsLikeByUserId(options.id)

    let collectCount = collect.getCollectCountByDataId(options.id)
    let isCollect = collect.getIsCollectByUserId(options.id)
    //请求展示数据
    wx.request({
      url: API_URL + '/hot-info-user-view/getById',
      data: {
        hotInfoId: options.id
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          //时间转换
          data.data.releaseTime = new Date(data.data.releaseTime).toLocaleDateString()
          that.setData({
            hotInfo: data.data,
            likeCount: likeCount,
            isLike: isLike,
            collectCount: collectCount,
            isCollect: isCollect
          })
          console.log(that.data)
        } else {
          wx.showToast({
            title: '请求数据失败！',
          })
        }
      }
    })
  },

  // 收藏、点赞事件
  onClickGiveCollectShare(e) {
    var _this = this
    let hotInfo = _this.data.hotInfo
    let is_b=false
    console.log(e.currentTarget.id)
    switch (e.currentTarget.id) {
      case "isLike":
        let count = _this.data.likeCount
        if (!_this.data.isLike) {
          is_b = like.likeClick(hotInfo)
          if (is_b) {
            wx.showToast({
              title: '点赞成功！',
            })
            count++
          } else {
            wx.showToast({
              title: '点赞失败！',
            })
          }
        } else {
          is_b = like.likeCancel(hotInfo)
          if (is_b) {
            count--
            wx.showToast({
              title: '取消成功！',
            })
          } else {
            wx.showToast({
              title: '取消失败！',
            })
          }
        }
        if(is_b){
          _this.setData({
            isLike: !_this.data.isLike,
            likeCount: count
          })
        }
        break
      case "isCollect":
        let collectCount=_this.data.collectCount
        if (!_this.data.isCollect) {
          is_b = collect.collectClick(hotInfo)
          if (is_b) {
            wx.showToast({
              title: '收藏成功！',
            })
            collectCount++
          } else {
            wx.showToast({
              title: '收藏失败！',
            })
          }
        } else {
          is_b = collect.collectCancel(hotInfo)
          if (is_b) {
            collectCount--
            wx.showToast({
              title: '取消成功！',
            })
          } else {
            wx.showToast({
              title: '取消失败！',
            })
          }
        }
        if(is_b){
          _this.setData({
            isCollect: !_this.data.isCollect,
            collectCount: collectCount
          })
        }
        break
      default:
        break
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