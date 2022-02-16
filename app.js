// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const userId=wx.getStorageSync('userId') || []
    this.globalData.userId=userId
    const userInfo=wx.getStorageSync('userInfo')||[]
    this.globalData.userInfo=userInfo
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    API_URL:"https://localhost:8002",//本地接口请求地址
    // API_URL:"https://www.aenlly.top:8005",//远程接口请求地址
    API_RES_URL:"https://localhost:8004",//本地资源请求地址
    // API_RES_URL:"https://www.aenlly.top:8005",//远程资源请求地址
    userInfo: null,
    userId: null
  }
})
