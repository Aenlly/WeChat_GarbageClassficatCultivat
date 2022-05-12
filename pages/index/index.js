// index.js
// 获取应用实例
const app = getApp()
var recorderManager = wx.getRecorderManager()
var date = new Date()
const options = {
  duration: 30000, //录音时长30秒
  numberOfChannels: 1, //单通道
  sampleRate: 16000, //采样率
  encodeBitRate: 24000, //编码码率
  numberOfChannels: 1, //通道
  format: 'wav', //格式
  frameSize: 3 * 1023 //帧大小，单位kb
}
//获得请求地址
const API_URL = app.globalData.API_URL;
var userId = ''
Page({
  data: {
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    video_url: '',
    msgList: [{
      url: "",
      title: "关于印发《长沙市装饰装修垃圾处理作业规范(试行)》的通知"
    }, ],
    startRecord: 0, //长按开始时间
    stopRecord: 0, //长按结束时间
    carousel: [],
    voicesear: "",
    pictusear: "",
  },
  //判断是否登录
  isLogin() {
    if (userId == '' || userId == null) {
      wx.showToast({
        title: '请先登录！',
        icon: 'error'
      })
      return false
    }
    return true
  },
  // 蒙层单击事件
  hideModal: function (e) {
    this.setData({
      isModal: false
    })
  },
  // 打卡跳转事件
  clockGo: function (e) {
    this.setData({
      isModal: false
    })
    wx.switchTab({
      url: '/pages/mine/mine',
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
    var _this = this
    if (!_this.isLogin()) {
      wx.showToast({
        title: '请先登录！',
        icon: 'error'
      })
      return
    }
    wx.chooseImage({
      count: 1,
      success(res) {
        if (res.tempFiles.size > 1024 * 1024 * 3) {
          wx.showToast({
            title: '图片太大了！',
            icon: 'error'
          })
          return
        }
        // 显示加载提示框
        wx.showLoading({
          title: '正在识别中',
        })
        wx.uploadFile({
          filePath: res.tempFilePaths[0], //图片临时路径
          name: 'picture',
          url: API_URL + '/search/searchPicture',
          success(res) {
            // 去掉加载提示框事件
            wx.hideLoading()
            //后端返回的数据需要json转换
            const data = JSON.parse(res.data)
            console.log(data)
            if (data.code == 200) {
              // 判断返回的内容是否为空
              if(data.data==''||data.data==null){
                wx.showToast({
                  title: '识别无内容!',
                  icon:'error'
                })
                return
              }

              wx.showToast({
                title: '识别成功！',
              })
              wx.navigateTo({
                url: '../indexs/search/search?name=' + data.data + "&type=图片识别",
              })
            } else if (data.code == 403) {
              wx.showToast({
                title: '请重新登录授权！',
                icon: 'error'
              })
              wx.clearStorage()
              //登录状态
              wx.setStorage({
                key: "hasUserInfo",
                data: false
              })
            } else {
              wx.showToast({
                title: '识别失败！',
                icon: 'error'
              })
            }
          },
          fail() {
            // 去掉加载提示框事件
            wx.hideLoading()
            wx.showToast({
              title: '服务器异常！',
              icon: 'error'
            })
          }
        })
      }
    })
  },

  // 文字搜索跳转事件
  textIdentify: function (e) {
    wx.navigateTo({
      url: '/pages/indexs/search/search'
    })
  },
  //判断是否授权
  settingRecord() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.showToast({
            title: '请先录音授权',
          })
          return
        }
      }
    })
  },

  // 录音长按事件
  startRecord: function (e) {
    let login_Flag = this.isLogin()
    if (login_Flag) {
      this.data.startRecord = e.timeStamp //开始时间
      // 显示加载提示框
      wx.showLoading({
        title: '正在录音中',
      })
      // 录音开始事件
      recorderManager.onStart()
      // 录音结束事件
      recorderManager.onStop((res) => {
        console.log(res)
        wx.showLoading({
          title: '正在识别中',
        })
        wx.uploadFile({
          filePath: res.tempFilePath, //录音临时路径
          name: 'voice',
          url: API_URL + '/search/searchVoice',
          success(res) {
            // 去掉加载提示框事件
            wx.hideLoading()
            //后端返回的数据需要json转换
            const data = JSON.parse(res.data)
            console.log(data)
            if (data.code == 200) {
              //判断返回的识别内容是否为空
              if(data.data==''||data.data==null){
                wx.showToast({
                  title: '识别无内容!',
                  icon:'error'
                })
                return
              }

              wx.showToast({
                title: '识别成功！',
              })
              wx.navigateTo({
                url: '../indexs/search/search?name=' + data.data + "&type=语音搜索",
              })
            } else if (data.code == 403) {
              wx.showToast({
                title: '请重新登录授权！',
                icon: 'error'
              })
              wx.clearStorage()
              //登录状态
              wx.setStorage({
                key: "hasUserInfo",
                data: false
              })
            } else {
              wx.showToast({
                title: '识别失败！',
                icon: 'error'
              })
            }
          },
          fail() {
            // 去掉加载提示框事件
            wx.hideLoading()
            wx.showToast({
              title: '服务器异常！',
              icon: 'error'
            })
          }
        })
      })
      // 完成指定帧大小自动结束
      recorderManager.onFrameRecorded((res) => {
        // 去掉加载提示框事件
        wx.hideLoading()
      })
      // 录音开始
      recorderManager.start(options)
    }
  },
  // 录音长按结束事件
  stopRecord(e) {
    this.data.stopRecord = e.timeStamp //结束时间
    if (this.data.stopRecord - this.data.startRecord < 500) {
      wx.showToast({
        title: '时间太短了！',
        icon: 'error'
      })
      return
    } else {
      recorderManager.stop()
    }
  },
  /**
   * 跳转搜索记录事件
   */
  clickToSearchLog: function () {
    wx.navigateTo({
      url: '/pages/indexs/searchlog/searchlog',
    })
  },
  /**
   * 外部链接跳转
   * @param {*} e  
   */
  clickToWeb: function (e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/webView/webView?url=' + url
    })
  },

  /**
   * 请求轮播图列表信息
   */
  getCarouselList: function () {
    var that = this
    wx.request({
      url: API_URL + '/carousel-user-view/get',
      success(res) {
        let data = res.data
        console.log(data)
        if (data.code == 200) {
          that.setData({
            carousel: data.data
          })
        } else {
          wx.showToast({
            title: '服务器异常！',
            icon: 'error',
          })
        }
      }
    })
  },
  /**
   * 获得首页视频
   */
  getByChekTop: function () {
    var that = this
    wx.request({
      url: API_URL + '/video-user-view/getByChekTop',
      success(res) {
        let data = res.data
        if (data.code == 200) {
          console.log(data)
          that.setData({
            video_url: data.data.videoUrl
          })
        } else {
          wx.showToast({
            title: '服务器异常！',
            icon: 'error',
          })
        }
      }
    })
  },
  // 页面加载事件
  onLoad() {

    userId = app.globalData.userId
    this.isLogin()

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
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    userId = app.globalData.userId
  },

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