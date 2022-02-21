// app.js
App({
  globalData: {
    // API_URL: "https://localhost:8002", //本地接口请求地址
    API_URL:"https://www.aenlly.top:8002",//远程接口请求地址
    // API_RES_URL: "http://localhost:8004", //本地资源请求地址
    API_RES_URL:"https://www.aenlly.top:8004",//远程资源请求地址
    userInfo: null,
    userId: null
  },
  onLaunch() {
    // const API_URL = "https://localhost:8002" //本地接口请求地址
    const API_URL = "https://www.aenlly.top:8002" //远程接口请求地址
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const userId = wx.getStorageSync('userId') || []
    this.globalData.userId = userId
    const userInfo = wx.getStorageSync('userInfo') || []
    this.globalData.userInfo = userInfo
    const hasUserInfo = wx.getStorageSync('hasUserInfo') || []


    if (hasUserInfo) {
      // 登录
      wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: API_URL + '/login', //服务器地址
                data: {
                  code: res.code,
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl
                },
                success(res) {
                  console.log(res)
                  //判断是否登录成功
                  if (res.data.code == 200) {
                    console.log(res.data.data)
                    //存储用户信息
                    wx.setStorage({
                      key: "userInfo",
                      data: res.data.data
                    })
                    //存储用户标识
                    wx.setStorage({
                      key: "userId",
                      data: res.data.data.token
                    })
                    //登录状态
                    wx.setStorage({
                      key: "hasUserInfo",
                      data: true
                    })
                  } else {
                    wx.showToast({
                      title: '服务器请求异常！',
                      duration: 1000,
                      icon: 'error',
                      mask: true
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: '服务器请求异常！',
                duration: 1000,
                icon: 'error',
                mask: true
              })
            }
          }
        }

      )
    }
  }
})