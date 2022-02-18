const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;

let isResult = false
let result = 0

/**
 * 进行点赞
 * @param {*传输数据} dataInfo 
 */
function likeClick(dataInfo) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/like-entity/createLike',
      header: {
        'token':app.globalData.userId,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: dataInfo,
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
 * @param {*实体名称} entityName 
 * @param {*数据id} id 
 */
function likeCancel(entityName,id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/like-entity/likeCancel/'+entityName+'/' + id,
      header:{
        'token':app.globalData.userId,
      },
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
 * @param {*实体名称} entityName 
 * @param {*数据id} id 
 */
function getLikeCountByDataId(entityName,id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/like-entity/getCountByDataId',
      data: {
        entityName: entityName,
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

/**
 * 判断当前用户是否点赞
 * @param {*实体名称} entityName 
 * @param {*数据id} id 
 */
function getIsLikeByUserId(entityName,id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/like-entity/getIsByUserId',
      header:{
        'token':app.globalData.userId,
      },
      data: {
        entityName: entityName,
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

module.exports = {
  likeClick: likeClick,
  likeCancel: likeCancel,
  getLikeCountByDataId: getLikeCountByDataId,
  getIsLikeByUserId: getIsLikeByUserId
}