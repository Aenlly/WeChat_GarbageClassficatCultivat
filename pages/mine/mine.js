// pages/mine/mine.js
const user = require("../../utils/user.js")
var app=getApp()
const API_URL=app.globalData.API_URL;
var userId=app.globalData.userId
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    middleInfo: {
      integrank: {
        imgurl: "/images/mine/integrank.png",
        text: "积分排行",
        activity: "/pages/mines/integranks/integrank/integrank"
      },
      integdesc: {
        imgurl: "/images/mine/integdesc.png",
        text: "积分说明",
        activity: "/pages/mines/integdescs/integdesc/integdesc"
      },
      integexcuh: {
        imgurl: "/images/mine/integexcuh.png",
        text: "积分兑换",
        activity: "/pages/mines/integexcuhs/integexcuh/integexcuh"
      },
      integlog: {
        imgurl: "/images/mine/integlog.png",
        text: "积分记录",
        activity: "/pages/mines/integlogs/integlog/integlog"
      }
    },
    bottomInfo: {
      // myhome: {
      //   imgurl: "/images/mine/myhome.png",
      //   text: "我的家",
      //   activity: "/pages/mines/myhomes/myhome/myhome",
      //   isnotice: false,
      //   count: 0
      // },
      myhome: {
        imgurl: "/images/mine/myhome.png",
        text: "每日签到",
        activity: "",
        isnotice: false,
        count: 0
      },
      myorder: {
        imgurl: "/images/mine/myorder.png",
        text: "我的订单",
        activity: "/pages/mines/myorders/myorder/myorder",
        isnotice: false,
        count: 0
      },
      // myrecruvolun: {
      //   imgurl: "/images/mine/myrecruvolun.png",
      //   text: "志愿通知",
      //   activity: "/pages/mines/myrecruvoluns/myrecruvolun/myrecruvolun",
      //   isnotice: true,
      //   count: 5
      // },
      mycollect: {
        imgurl: "/images/mine/mycollect.png",
        text: "我的收藏",
        activity: "/pages/packageService/pages/services/collects/collect/collect",
        isnotice: false,
        count: 6
      },
      myabout: {
        imgurl: "/images/mine/myabout.png",
        text: "关于我们",
        activity: "/pages/mines/myabouts/myabout/myabout",
        isnotice: false,
        count: 0
      }
    },
    userInfo: {
      avatarUrl: "/images/mine/headprictu.png",
      nickName: "未登录，点击头像授权",
      accumulativePoints:0,
      points:{
        pointsName: "无"
      }
    },
    hasUserInfo: false
  },
  // 我的头衔容器单击事件
  onClickNavlevel: function (e) {
    wx.navigateTo({
      url: "/pages/mines/integlevels/integlevel/integlevel"
    })
  },
  // 导航栏列表单击事件
  onClickUrl(e) {
    var _this=this
    if(e.currentTarget.dataset.text=='每日签到'){
      if(userId==null||userId==''){
        wx.showToast({
          title: '请先登录！',
        })
      }else{
      wx.request({
        url: API_URL+'/points-log/dailyCheck',
        method:"PUT",
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          userId:userId
        },success(res){
          var data=res.data
          console.log(data)
          if(data.code==200){
            user.getUserById().then((value)=>{
              _this.setData({
                userInfo: value,
                hasUserInfo: true
              })
            })
            wx.showToast({
              title: '签到成功！',
            })
          }else if(data.code==300){
            wx.showToast({
              title: '今日已签到！',
              icon:'error',
              mask:true
            })
          }else{
            wx.showToast({
              title: '签到失败！',
              icon:'error',
              mask:true
            })
          }
        }
      })
    }
    }
    
    // 退出登录事件
    wx.navigateTo({
      url: e.currentTarget.dataset.activity,
    })
  },
  //退出登录单击事件
  onClickQuit: function (e) {
    wx.clearStorage({
      success: (res) => {
        this.setData({
          userInfo: {
            avatarUrl: "/images/mine/headprictu.png",
            nickName: "未登录，点击头像授权",
            accumulativePoints:0,
            points:{
              pointsName: "无"
            }
          },
          hasUserInfo: false
        })
        wx.showToast({
          title: '退出成功',
        })
      }
    })
  },

  /**
   * 登录事件
   * @param {*} e 
   */
  onClickLogin(e) {
    var that = this
    if (!that.data.hasUserInfo) {
      console.log(that.data.hasUserInfo)
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          let info=res.userInfo
          wx.login({
            success(res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: API_URL+'/login', //服务器地址
                  data: {
                    code: res.code,
                    nickName: info.nickName,
                    avatarUrl: info.avatarUrl
                  },success(res){
                    //判断是否登录成功
                    if(res.data.code==200){
                    that.setData({
                      userInfo: res.data.data,
                      hasUserInfo: true
                    })
                    //存储用户信息
                    wx.setStorage({
                      key: "userInfo",
                      data: res.data.data
                    })
                    //存储用户标识
                    wx.setStorage({
                      key: "userId",
                      data: res.data.data.userId
                    })
                    //登录状态
                    wx.setStorage({
                      key: "hasUserInfo",
                      data: true
                    })
                    wx.showToast({
                      title: '登录成功！',
                      duration: 1000
                    })
                    app.globalData.userInfo=res.data.data,
                    app.globalData.userId=res.data.data.userId
                    userId=res.data.data.userId
                  }else{
                    wx.showToast({
                      title: '登录失败！',
                      duration: 1000,
                      icon:'error',
                      mask:true
                    })
                  }
                  }
                })
              } else {
                wx.showToast({
                  title: '登录失败！',
                  icon:'error',
                  mask:true,
                  duration: 1000
                })
              }
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // 获取本地信息
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        _this.setData({
          userInfo: res.data
        })
      },
    })
    // 判断本地数据是否授权
    wx.getStorage({
      key: 'hasUserInfo',
      success(res) {
        _this.setData({
          hasUserInfo: res.data
        })
      },
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