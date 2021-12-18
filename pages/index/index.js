// index.js
// 获取应用实例
const app = getApp()
const recorderManager = wx.getRecorderManager() //全局录音管理器
var date = new Date()
const options = {
  duration: 60000,//录音时长10秒
  sampleRate: 44100,
  numberOfChannels: 1,//通道
  encodeBitRate: 192000,
  format: 'mp3',//格式
  frameSize: 500 //帧大小，单位kb
}
//获得请求地址
const API_URL=app.globalData.API_URL;
Page({
  data: {
    //资源请求地址
    API_RES_URL:getApp().globalData.API_RES_URL,
    video_url: '',
    msgList: [{
      url: "",
      title: "关于印发《长沙市装饰装修垃圾处理作业规范(试行)》的通知"
    },
    {
      url: "",
      title: "关于印发《长沙市装饰装修垃圾处理作业规范(试行)》的通知"
    }
    ],
    carousel: [],
    voicesear: "",
    pictusear: "",
  },
  // 蒙层单击事件
  hideModal: function (e) {
    this.setData({
      isModal: false
    })
  },
  // 打卡跳转事件
  clockGo: function (e) {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/pictuclocks/pictuclockadd/pictuclockadd'
    })
  },
  // 垃圾分类四个框跳转事件
  bindViewTapGarbage: function (e) {
    var garbage = e.currentTarget.dataset.garbage
    wx.navigateTo({
      url: '/pages/indexs/garbage/garbage?garbageType=' + garbage
    })
  },

  // 打开用户图库操作
  clickPictu() {
    var that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        // 因为是子节点直接使用会报错
        that.setData({
          pictusear: res.tempFilePaths,
        })
        // 跳转至搜索结果页
        wx.navigateTo({
          url: '/pages/indexs/search/search'
        })
      }
    })
    console.log(this.data)
  },

  // 文字搜索跳转事件
  textIdentify: function (e) {
    wx.navigateTo({
      url: '/pages/indexs/search/search'
    })
  },

  // 录音长按事件
  startRecord: function (e) {
    // 显示加载提示框
    wx.showLoading({
      title: '正在识别中',
    })
    // 录音开始事件
    recorderManager.onStart()
    // 录音结束事件
    recorderManager.onStop((res) => {
      // 保存录音临时路径
      this.setData({
        voicesear: res.tempFilePath
      })
      // 去掉加载提示框事件
      wx.hideLoading()
    })
    // 完成指定帧大小自动结束
    recorderManager.onFrameRecorded((res) => {
      // 去掉加载提示框事件
      wx.hideLoading()
    })
    // 录音开始
    recorderManager.start(options)
    
  },
  // 长按结束事件
  stopRecord() {
    recorderManager.stop()
    // 跳转至搜索结果页
    wx.navigateTo({
      url: '/pages/indexs/search/search'
    })
  },
  /**
   * 跳转搜索记录事件
   */
  clickToSearchLog:function(){
    wx.navigateTo({
      url: '/pages/indexs/searchlog/searchlog',
    })
  },
  /**
   * 外部链接跳转
   * @param {*} e  
   */
  clickToWeb:function(e){
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/webView/webView?url=' + url
    })
  },

  /**
   * 请求轮播图列表信息
   */
  getCarouselList:function(){
    var that=this
    wx.request({
      url: API_URL+'/carousel-user-view/get',
      success(res){
        let data=res.data
        console.log(data)
        if(data.code==200){
          that.setData({
            carousel:data.data
          })
        }else{
          wx.showToast({
            title: '服务器异常！',
            icon:'error',
          })
        }
      }
    })
  },
  /**
   * 获得首页视频
   */
  getByChekTop:function(){
    var that=this
    wx.request({
      url: API_URL+'/video-user-view/getByChekTop',
      success(res){
        let data=res.data
        if(data.code==200){
          console.log(data)
          that.setData({
            video_url:data.data.videoUrl
          })
        }else{
          wx.showToast({
            title: '服务器异常！',
            icon:'error',
          })
        }
      }
    }) 
  },
  // 页面加载事件
  onLoad() {
    this.getCarouselList()
    this.getByChekTop()
    try {
      var oldDate = Date.parse(new Date(wx.getStorageSync('clockTime')))
      var newDate = Date.parse(date.toLocaleDateString())
      // 旧日期存在则继续判断
      if (oldDate) {
        // 获得时间差
        if (newDate - oldDate > 0) {
          wx.setStorageSync('clockTime', date.toLocaleDateString())
          this.setData({
            isModal: true
          })
        } else {
          this.setData({
            isModal: false
          })
        }
      } else {
        wx.setStorageSync('clockTime', date.toLocaleDateString())
        this.setData({
          isModal: true
        })
      }
    } catch {
      wx.setStorageSync('clockTime', date.toLocaleDateString())
      this.setData({
        isModal: true
      })
    }

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  }

  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})