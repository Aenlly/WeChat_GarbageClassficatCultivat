// pages/services/wastetreas/wastetreainfo/wastetreainfo.js
const collect = require('../../../../../../utils/collect')
const like = require("../../../../../../utils/like.js")
const app = getApp()
const entityName = '变废为宝'
//获得请求地址
const API_URL = app.globalData.API_URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    waste: {
      title: "视频23123123111123122222222222222222221111111111111111111111",
      videoUrl: "https://www.bilibili.com/video/BV1Kv411G7GR?share_source=copy_web",
      desc: "参与人员分为若干组，在一定区域内寻找藏在各个地方的垃圾（模型），然后将垃圾（模型）送到相应的四个垃圾桶得分，得分最高的队伍可以获得奖励。在将垃圾（模型）送到垃圾桶的路上，其他队伍可以进行抢夺。（注：禁止在垃圾桶50米范围内发生抢夺，以免队伍被守株待兔，违反此规则的队伍直接取消资格）",
      insert_time: "2021-05-05"
    },
    icon: true,
    share: {
      count: 411414
    },
    video_title: "video_title_unell", //默认展开简介
    des_view: true,
    likeCount: 0, //点赞量
    isLike: false, //是否显示已点赞
    collectCount: 0, //收藏量
    isCollect: false, //是否显示已收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id == '' || options.id==null) {
      wx.showToast({
        title: '丢失数据！',
        icon: 'error'
      })
      return
    } else {

      var _this = this
      _this.init(options.id)

      // 获得场景值来进行增加分享数
      var obj = wx.getLaunchOptionsSync()
      if (obj.scene == 1036) {
        wx.request({
          url: API_URL + '/waste-turn-treasure/upShareCount/' + options.id,
          method: 'PUT',
          success(res) {
            let data = res.data
            if (data.code == 200) {
              _this.setData({
                ["waste.shareCount"]: data.data
              })
            }
          }
        })
      }
    }
    //请求展示数据
    wx.request({
      url: API_URL + '/waste-turn-treasure/getOneById/'+options.id,
      success(res) {
        let data = res.data
        if (data.code == 200) {
          _this.setData({
            waste: data.data,
          })
          console.log(data.data)
        } else {
          wx.showToast({
            title: '请求数据失败！',
            icon: 'error',
            mask: true
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
    if (app.globalData.userId == null || app.globalData.userId == '') {
      wx.showToast({
        title: '请先登录！',
        icon: 'error'
      })
      return
    }

    var _this = this
    let waste = _this.data.waste
    let id = waste.id
    let data = {
      userId: app.globalData.userId,
      entityName: entityName,
      dataId: waste.id,
      imgUrl: waste.imgUrl,
      dataTitle: waste.text,
      dataDesc: waste.textDesc,
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
            mask: true
          })
        } else {
          wx.showToast({
            title: '点赞失败！',
            icon: 'error',
            mask: true
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
            mask: true
          })
        } else {
          wx.showToast({
            title: '取消失败！',
            icon: 'error',
            mask: true
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
            mask: true
          })
          _this.setData({
            isCollect: !_this.data.isCollect,
            collectCount: count
          })
        } else {
          wx.showToast({
            title: '收藏失败！',
            icon: 'error',
            mask: true
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
            mask: true
          })
        } else {
          wx.showToast({
            title: '取消失败！',
            icon: 'error',
            mask: true
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

  }
})