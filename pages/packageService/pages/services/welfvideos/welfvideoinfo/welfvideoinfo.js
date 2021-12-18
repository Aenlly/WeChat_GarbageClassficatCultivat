// pages/services/welfvideos/welfvideoinfo/welfvideoinfo.js
const collect = require('../../../../../../utils/collect')
const like = require("../../../../../../utils/like.js")
const app = getApp()
const entityName = '公益视频'
//获得请求地址
const API_URL = app.globalData.API_URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    icon: true,
    video_title: "video_title_unell",//默认展开简介
    des_view: true,
    likeCount:0, //点赞量
    isLike:false,//是否显示已点赞
    collectCount:0,//收藏量
    isCollect:false,//是否显示已收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.init(options.id)

    // 获得场景值来进行增加分享数
    var obj = wx.getLaunchOptionsSync()
    if (obj.scene == 1036) {
      wx.request({
        url: API_URL + '/video-user-view/upShareCount/' + options.id,
        method: 'PUT',
        success(res) {
          let data = res.data
          if (data.code == 200) {
            _this.setData({
              ["video.shareCount"]: data.data
            })
          }
        }
      })
    }
    //请求展示数据
    wx.request({
      url: API_URL + '/video-user-view/getById',
      data: {
        id: options.id
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          _this.setData({
            video: data.data,
          })
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
  init: function (id) {
    var _this = this
    like.getLikeCountByDataId(entityName, id).then((value) => {
      _this.setData({
        likeCount: value
      })
    })

    like.getIsLikeByUserId(entityName, id).then((value) => {
      _this.setData({
        isLike: value
      })
    })

    collect.getCollectCountByDataId(entityName, id).then((value) => {
      _this.setData({
        collectCount: value
      })
    })

    collect.getIsCollectByUserId(entityName, id).then((value) => {
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
    if(app.globalData.userId==null||app.globalData.userId==''){
      wx.showToast({
        title: '请先登录！',
        icon:'error'
      })
      return
    }
    
    var _this = this
    let video = _this.data.video
    let id = video.videoId
    let data = {
      userId: app.globalData.userId,
      entityName: entityName,
      dataId: video.videoId,
      imgUrl: video.videoImg,
      dataTitle: video.videoTitle,
      dataDesc: video.videoDesc,
    }

    switch (e.currentTarget.id) {
      case "isLike":
        _this.likeClick(data, id)
        break
      case "isCollect":
        _this.collectClick(data, id)
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
  likeClick(data, id) {
    var _this = this
    var count = _this.data.likeCount
    if (!_this.data.isLike) {
      like.likeClick(data).then((value) => {
        if (value) {
          count++
          _this.setData({
            isLike: !_this.data.isLike,
            likeCount: count
          })
          wx.showToast({
            title: '点赞成功！',
            mask:true
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
      like.likeCancel(entityName, id).then((value) => {
        if (value) {
          count--
          _this.setData({
            isLike: !_this.data.isLike,
            likeCount: count
          })
          wx.showToast({
            title: '取消成功！',
            mask:true
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
  collectClick(data, id) {
    var _this = this
    var count = _this.data.collectCount
    if (!_this.data.isCollect) {
      collect.collectClick(data).then((value) => {
        if (value) {
          count++
          wx.showToast({
            title: '收藏成功！',
            mask:true
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
      collect.collectCancel(entityName, id).then((value) => {
        if (value) {
          count--
          _this.setData({
            isCollect: !_this.data.isCollect,
            collectCount: count
          })
          wx.showToast({
            title: '取消成功！',
            mask:true
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

  // 上下图标切换功能
  onClickIcon(e) {
    var _this = this
    console.log(this.data.icon)
    _this.setData({
      icon: !_this.data.icon,
      video_title: _this.data.icon == true ? "video_title_ell" : "video_title_unell",
      des_view: !_this.data.des_view
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
    let _this = this
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: _this.video.videoTitle,
          id: _this.video.videoId
        })
      }, 1000)
    })
    return {
      title: _this.video.videoTitle,
      promise
    }
  }
})