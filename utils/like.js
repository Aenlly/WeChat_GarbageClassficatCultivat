const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;

let isResult = false
let result = 0
/**异步方法函数需要进行回调 */
/**
 * 执行点赞
 * @param {传递参数} hotInfo 
 */
function likeClick(hotInfo) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/like-entity/createLike',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: app.globalData.userId,
        entityName: "热门资讯",
        dataId: hotInfo.hotInfoId,
        imgUrl: hotInfo.imgUrl,
        dataTitle: hotInfo.hotInfoTitle,
        dataDesc: hotInfo.hotInfoDesc
      },
      method: "POST",
      success(res) {
        let data = res.data
        if (data.code == 200) {
          isResult = data.data
        }
        resolve(isResult)
      }
    })
  })
}

/**
 * 取消点赞
 * @param {*传递参数} hotInfo 
 */
function likeCancel(hotInfo) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/like-entity/likeCancel/' + app.globalData.userId + '/热门资讯/' + hotInfo.hotInfoId,
      method: "DELETE",
      success(res) {
        let data = res.data
        if (data.code == 200) {
          isResult = data.data
        }
        resolve(isResult)
      }
    })
  })
}

/**
 * 获得点赞数据量
 * @param {*} id 数据id
 */
function getLikeCountByDataId(id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/like-entity/getCountByDataId',
      data: {
        entityName: "热门资讯",
        dataId: id
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          result = data.data
        }
        resolve(result)
      }
    })
  })
}

//判断当前用户是否点赞
function getIsLikeByUserId(id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/like-entity/getIsByUserId',
      data: {
        userId: app.globalData.userId,
        entityName: "热门资讯",
        dataId: id
      },
      success(res) {
        let data = res.data
        if (data.code == 200) {
          isResult = data.data
        }
        resolve(isResult)
      }
    })
  })
}

/**
 * 点赞
 * @param {*} hotInfo 
 */
function Click(hotInfo){
  likeClick(hotInfo).then((value)=>{
    isResult=value
  })
  return isResult
}

/**
 * 取消点赞
 * @param {*} hotInfo 
 */
function Cancel(hotInfo) {
  likeCancel(hotInfo).then((value)=>{
    isResult=value
  })
  return isResult
}
/**
 * 判断是否点赞过
 * @param {*} id 
 */
function getByUserId(id){
  getIsLikeByUserId(id).then((value)=>{
    isResult=value
  })
  return isResult
}

/**
 * 获得点赞量
 * @param {*} id 
 */
function getCountByDataId(id){
  getLikeCountByDataId(id).then((value)=>{
    result=value
  })
  return result
}

module.exports = {
  likeClick: Click,
  likeCancel: Cancel,
  getLikeCountByDataId: getCountByDataId,
  getIsLikeByUserId: getByUserId
}