// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    row: {
      0: {
        game: {
          imgurl: "/images/service/game.png",
          text: "游戏专区",
          activity: "/pages/services/games/game/game"
        },
        wiki: {
          imgurl: "/images/service/wiki.png",
          text: "热门资讯",
          activity: "/pages/services/wikis/wiki/wiki"
        },
        knowtest: {
          imgurl: "/images/service/knowtest.png",
          text: "知识测验",
          activity: "/pages/services/knowtests/knowtest/knowtest"
        }
      },
      1: {
        game: {
          imgurl: "/images/service/pictuclock.png",
          text: "拍照打卡",
          activity: "/pages/services/pictuclocks/pictuclock/pictuclock"
        },
        wiki: {
          imgurl: "/images/service/policydoc.png",
          text: "政策宣传",
          activity: "/pages/services/policydocs/policydoc/policydoc"
        },
        knowtest: {
          imgurl: "/images/service/activitlist.png",
          text: "活动列表",
          activity: "/pages/services/activitlists/activitlist/activitlist"
        }
      },
      2: {
        game: {
          imgurl: "/images/service/wastetrea.png",
          text: "变废为宝",
          activity: "/pages/services/wastetreas/wastetrea/wastetrea"
        },
        wiki: {
          imgurl: "/images/service/welfvideo.png",
          text: "公益视频",
          activity: "/pages/services/welfvideos/welfvideo/welfvideo"
        },
        knowtest: {
          imgurl: "/images/service/collect.png",
          text: "我的收藏",
          activity: "/pages/services/collects/collect/collect"
        }
      }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onClickUrl:function(e){
    //跳转
    wx.navigateTo({
      url: e.currentTarget.dataset.activity
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