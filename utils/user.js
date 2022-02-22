const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;

//获得用户数据
function getUserById() {
  //用户编号
const userId = app.globalData.userId;
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/user/getById',
      header:{
        'token':userId
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          console.log(data.data)
          //存储用户信息
          wx.setStorage({
            key: "userInfo",
            data: data.data
          })
          //存储用户标识
          wx.setStorage({
            key: "userId",
            data: data.data.userId
          })
          resolve(data.data)
        } else {
          wx.showToast({
            title: '更新数据失败！',
          })
        }
      }
    })
  })
}

module.exports = {
  getUserById: getUserById,
}