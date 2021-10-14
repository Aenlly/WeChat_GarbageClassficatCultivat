// pages/services/welfvideos/welfvideoinfo/welfvideoinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfvideo: {
      title: "视频23123123111123122222222222222222221111111111111111111111",
      videoUrl: "http://ydmshipin.oss-cn-shenzhen.aliyuncs.com/%E9%A1%B9%E7%9B%AE%E8%A7%86%E9%A2%91/%E8%89%BE%E7%81%B8%E7%A5%9B%E5%AF%92%E6%94%BE%E6%9D%BE-%E8%82%A9%E9%83%A8.mp4",
      desc: "参与人员分为若干组，在一定区域内寻找藏在各个地方的垃圾（模型），然后将垃圾（模型）送到相应的四个垃圾桶得分，得分最高的队伍可以获得奖励。在将垃圾（模型）送到垃圾桶的路上，其他队伍可以进行抢夺。（注：禁止在垃圾桶50米范围内发生抢夺，以免队伍被守株待兔，违反此规则的队伍直接取消资格）",
      insert_time: "2021-05-05"
    },
    icon: false,
    give: {
      isgive: false,
      count: 15151
    },
    collect: {
      iscollect: false,
      count: 15160
    },
    share: {
      count: 411414
    },
    video_title: "video_title_ell",
    des_view: true
  },
  // 收藏、点赞事件
  onClickGiveCollectShare(e) {
    var _this = this
    console.log(_this.data.give.isgive)
    switch (e.currentTarget.id) {
      case "isgive":
        var count = _this.data.give.count
        if (!_this.data.give.isgive) {
          count++
        } else {
          count--
        }
        _this.setData({
          give: {
            isgive: !_this.data.give.isgive,
            count: count
          }
        })
        break
      case "iscollect":
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
      case "share":
        onShareAppMessage()
        wx.showShareMenu({
          withShareTicket: true,
          menus: ['shareAppMessage']
        })
        break
      default:
        break
    }
  },
  // 上下图标切换功能
  onClickIcon(e) {
    var _this = this
    console.log(this.data.icon)
    _this.setData({
      icon: !_this.data.icon,
      video_title: _this.data.icon == false ? "video_title_unell" : "video_title_ell",
      des_view: !_this.data.des_view
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得场景值来进行增加分享数
    var obj = wx.getLaunchOptionsSync()
    if (obj.scene == 1036) {

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
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '垃圾分类养成'
        })
      }, 2000)
    })
    return {
      title: '自定义转发标题',
      path: '/page/user?share=1',
      promise
    }
  }
})