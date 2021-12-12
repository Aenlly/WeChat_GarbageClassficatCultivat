// pages/services/wikis/wikis/wikis.js
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
   * 获得点赞数据量
   * @param {*} id 数据id
   */
  getCountByDataId: function (id) {
    var that = this
    wx.request({
      url: API_URL + '/like-entity/getCountByDataId',
      data: {
        entityName: "热门资讯",
        dataId: id
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          that.setData({
            likeCount: data.data
          })
        } else {
          wx.showToast({
            title: '请求点赞数据失败',
          })
        }
      }
    })
  },

  //判断当前用户是否点赞
  getIsByUserId: function (id) {
    var that = this
    wx.request({
      url: API_URL + '/like-entity/getIsByUserId',
      data: {
        userId: app.globalData.userId,
        entityName: "热门资讯",
        dataId: id
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          that.setData({
            isLike: data.data
          })
        } else {
          wx.showToast({
            title: '请求点赞数据失败',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getCountByDataId(options.id)
    that.getIsByUserId(options.id)
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
            hotInfo: data.data
          })
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

    switch (e.currentTarget.id) {
      case "isLike":
        let hotInfo = _this.data.hotInfo
        if (!_this.data.isLike) {
          _this.likeClick(hotInfo)
        } else {
          _this.likeCancel(hotInfo)
        }
        break
      case "isCollect":
        var count = _this.data.collect.count
        if (!_this.data.collect.iscollect) {
          count++
        } else {
          count--
        }
        _this.setData({
          collect: {
            iscollect: !_this.data.collect.iscollect,
            count: count
          }
        })
        break
      default:
        break
    }
  },

  /**
   * 执行点赞
   * @param {传递参数} hotInfo 
   */
  likeClick:function(hotInfo){
    var _this = this
    wx.request({
      url: API_URL + '/like-entity/createLike',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: app.globalData.userId,
        entityName: "热门资讯",
        dataId: hotInfo.hotInfoId,
        imgUrl: hotInfo.imgUrl,
        dataTitle: hotInfo.hotInfoTitle,
        dataDesc: hotInfo.hotInfoDesc
      },
      method: "POST",
      success(res) {
        let data = res.data
        if (data.code == 200) {
          let count = _this.data.likeCount
          count++
          _this.setData({
            isLike: !_this.data.isLike,
            likeCount: count
          })
          //提示
          wx.showToast({
            title: '点赞成功！',
          })
        } else {
          wx.showToast({
            title: '点赞失败',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 取消点赞
   * @param {*传递参数} hotInfo 
   */
  likeCancel:function(hotInfo){
    var _this = this
    wx.request({
      url: API_URL + '/like-entity/likeCancel/' + app.globalData.userId + '/热门资讯/' + hotInfo.hotInfoId,
      method: "DELETE",
      success(res) {
        let data = res.data
        if (data.code == 200) {
          let count = _this.data.likeCount
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