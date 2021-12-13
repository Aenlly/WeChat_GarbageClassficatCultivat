const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
let isResult = false
let result = 0
/**异步方法函数需要进行回调 */
/**
 * 执行收藏
 * @param {传递参数} hotInfo 
 */
function collectClick(hotInfo) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/collect-entity/createCollect',
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
function collectCancel(hotInfo) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/collect-entity/collectCancel/' + app.globalData.userId + '/热门资讯/' + hotInfo.hotInfoId,
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
 * 获得收藏数据量
 * @param {*} id 数据id
 */
function getCollectCountByDataId(id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/collect-entity/getCountByDataId',
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

//判断当前用户是否收藏
function getIsCollectByUserId(id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/collect-entity/getIsByUserId',
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
 * 收藏
 * @param {*数据信息} hotInfo 
 */
function Click(hotInfo){
  collectClick(hotInfo).then((value)=>{
    isResult=value
  })
  return isResult
}

/**
 * 取消收藏
 * @param {*数据信息} hotInfo 
 */
function Cancel(hotInfo){
  collectCancel(hotInfo).then((value)=>{
    isResult=value
  })
  return isResult
}

/**
 * 判断是否收藏过
 * @param {*数据id} id 
 */
function getByUserId(id){
  getIsCollectByUserId(id).then((value)=>{
    isResult=value
  })
  return isResult
}

/**
 * 获得收藏量
 * @param {*数据id} id 
 */
function getCountByDataId(id){
  getCollectCountByDataId(id).then((value)=>{
    result=value
  })
  return result
}

module.exports = {
  collectClick: Click,
  collectCancel: Cancel,
  getCollectCountByDataId: getCountByDataId,
  getIsCollectByUserId: getByUserId
}