// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    middleInfo:{
      integrank:{
        imgurl:"/images/mine/integrank.png",
        text:"积分排行",
        activity:"/pages/mines/integranks/integrank/integrank"
      },
      integdesc:{
        imgurl:"/images/mine/integdesc.png",
        text:"积分说明",
        activity:"/pages/mines/integdescs/integdesc/integdesc"
      },
      integexcuh:{
        imgurl:"/images/mine/integexcuh.png",
        text:"积分兑换",
        activity:"/pages/mines/integexcuhs/integexcuh/integexcuh"
      },
      integlog:{
        imgurl:"/images/mine/integlog.png",
        text:"积分记录",
        activity:"/pages/mines/integlogs/integlog/integlog"
      }
    },
    bottomInfo:{
      myhome:{
        imgurl:"/images/mine/myhome.png",
        text:"我的家",
        activity:"/pages/mines/myhomes/myhome/myhome"
      },
      myorder:{
        imgurl:"/images/mine/myorder.png",
        text:"我的订单",
        activity:"/pages/mines/myorders/myorder/myorder"
      },
      mycontribute:{
        imgurl:"/images/mine/mycontribute.png",
        text:"我要投稿",
        activity:"/pages/mines/mycontributes/mycontribute/mycontribute"
      },
      myrecruvolun:{
        imgurl:"/images/mine/myrecruvolun.png",
        text:"招募志愿者",
        activity:"/pages/mines/myrecruvoluns/myrecruvolun/myrecruvolun"
      },
      mycollect:{
        imgurl:"/images/mine/mycollect.png",
        text:"我的收藏",
        activity:"/pages/mines/mycollects/mycollect/mycollect"
      },
      myinfo:{
        imgurl:"/images/mine/myinfo.png",
        text:"个人信息",
        activity:"/pages/mines/myinfos/myinfo/myinfo",
      },
      myfeedback:{
        imgurl:"/images/mine/myfeedback.png",
        text:"进行反馈",
        activity:"/pages/mines/myfeedbacks/myfeedback/myfeedback"
      },
      myabout:{
        imgurl:"/images/mine/myabout.png",
        text:"关于我们",
        activity:"/pages/mines/myabouts/myabout/myabout"
      },
      logoff:{
        imgurl:"/images/mine/logoff.png",
        text:"退出登录",
        activity:""
      }
    },
    mine:{
      integ_title:"无",
      integ_number:0,
    },
    userInfo:{
      avatarUrl:"/images/mine/headprictu.png",
      nickName:"未登录，点击头像授权"
    },
    hasUserInfo:false
  },
  onClickUrl(e){
    if(e.currentTarget.dataset.activity.length==0){
      
    }else{
    wx.navigateTo({
      url: e.currentTarget.dataset.activity,
    })
  }
    
  },
  onClickLogin(e){
    var that=this
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            //后台接口
            url: 'https://example.com/onLogin',
            data: {
              code: res.code
            }
          })
          if(!that.data.hasUserInfo){
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
            // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            wx.getUserProfile({
              desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
              success: (res) => {
                that.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
                console.log(res)
              }
            })
          }
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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