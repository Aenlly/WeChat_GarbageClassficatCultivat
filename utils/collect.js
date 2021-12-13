const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
var isResult = false
var result = 0

/**
 * 进行收藏
 * @param {*传递数据} dataInfo 
 */
function collectClick(dataInfo) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/collect-entity/createCollect',
      header: {
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
function collectCancel(entityName,id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/collect-entity/collectCancel/' + app.globalData.userId + '/'+entityName+'/' + id,
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
 * @param {*实体名称} entityName 
 * @param {*数据id} id 
 */
async function getCollectCountByDataId(entityName,id) {
  return new Promise((resolve) => {
    wx.request({
      url: API_URL + '/collect-entity/getCountByDataId',
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
 * 判断当前用户是否收藏
 * @param {*实体名称} entityName 
 * @param {*数据id} id 
 */
async function getIsCollectByUserId(entityName,id) {
  return new Promise((resolve) => {
  wx.request({
      url: API_URL + '/collect-entity/getIsByUserId',
      data: {
        userId: app.globalData.userId,
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
  collectClick: collectClick,
  collectCancel: collectCancel,
  getCollectCountByDataId: getCollectCountByDataId,
  getIsCollectByUserId: getIsCollectByUserId
}