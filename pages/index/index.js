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

Page({
  data: {
    video_src: 'https://www.bilibili.com/video/BV1ng411F7tE?share_source=copy_web',
    msgList: [{
      url: "",
      title: "关于印发《长沙市装饰装修垃圾处理作业规范(试行)》的通知"
    },
    {
      url: "",
      title: "关于印发《长沙市装饰装修垃圾处理作业规范(试行)》的通知"
    }
    ],
    carousel: [{
      carousel_id: 1,
      carousel_img: "https://img.tcs.onein.cn/cldfactory/iasset/2dd0825c-dab8-46fa-b62f-9e73c9ba2748/17b7427b-46bb-4638-9ec9-34910a42a5a3.png"
    },
    {
      carousel_id: 1,
      carousel_img: "https://img.tcs.onein.cn/cldfactory/iasset/2dd0825c-dab8-46fa-b62f-9e73c9ba2748/dc48ef62-288a-4947-958c-35c7279cc952.png"
    }
    ],
    voicesear: "",
    pictusear: "",
    isModal: false
  },
  // 蒙层单击事件
  hideModal: function (e) {
    this.setData({
      isModal: true
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
      url: '/pages/indexs/garbage/garbage?garbage=' + garbage
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
    // 跳转至搜索结果页
    wx.navigateTo({
      url: '/pages/indexs/search/search'
    })
  },
  // 长按结束事件
  stopRecord() {
    recorderManager.stop()
  },
  // 页面加载事件
  onLoad() {
    try {
      var oldDate = wx.getStorageSync('clockTime')
      console.log("132  " + (date.toLocaleDateString() - oldDate.toLocaleDateString()))
      // 获得本地时间
      if (oldDate.getDate()) {
        if (date.toLocaleDateString() - oldDate > 0) {
          wx.setStorageSync('clockTime', date.toLocaleDateString())
        } else {
          this.setData({
            isModal: true
          })
        }
      }
    } catch {
      wx.setStorageSync('clockTime', date.toLocaleDateString())
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