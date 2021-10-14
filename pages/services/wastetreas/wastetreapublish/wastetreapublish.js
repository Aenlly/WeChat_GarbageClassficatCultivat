// pages/services/wastetreas/wastetreapublish/wastetreapublish.js
import Uploader from '../../../../miniprogram_npm/miniprogram-file-uploader/index'

//官方样例地址：https://github.com/wechat-miniprogram/miniprogram-file-uploader/blob/master/example/client/index/index.js
//本地下载样例文件地址：D:\应用数据\Google下载文件\压缩文件\miniprogram-file-uploader-master.zip
//后台分块用node.js写api
const HOST_IP = '192.168.100.24'//上传地址
const MERGE_URL = `http://${HOST_IP}:3000/merge`//验证地址
const VERIFY_URL = `http://${HOST_IP}:3000/verify`//合并地址
const UPLOAD_URL = `http://${HOST_IP}:3000/upload`//上传地址

const MB = 1024 * 1024 //视频大小

Page({
  /**
   * 页面的初始数据
   */
  data: {
    progress: 0,
    uploadedSize: 0,
    averageSpeed: 0,
    timeRemaining: Number.POSITIVE_INFINITY,
    testChunks: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.chunkSize = 5 * MB
  },

  onTestChunksChange(e) {
    const value = e.detail.value
    this.data.testChunks = value
  },

  // 选择视频文件
  async chooseVideo() {
    this.reset()
    const {
      tempFilePath,
      size,
    } = await wx.chooseVideo({
      sourceType: ['album'],
      compressed: false
    })

    if (!Uploader.isSupport()) {
      wx.showToast({
        title: '分片上传在 2.10.0 版本以上支持',
        icon: 'none',
        duration: 3000
      })
      return
    }
    const uploader = new Uploader({
      tempFilePath,
      totalSize: size,
      fileName: 'demo',
      verifyUrl: VERIFY_URL, //验证地址
      uploadUrl: UPLOAD_URL, //上传地址
      mergeUrl: MERGE_URL, //合并地址
      testChunks: this.data.testChunks,
      verbose: true
    })
    uploader.on('retry', (res) => {
      console.log('retry', res.url)
    })

    uploader.on('complete', (res) => {
      console.log('upload complete', res)
    })

    uploader.on('success', (res) => {
      console.log('upload success', res)
    })

    uploader.on('fail', (res) => {
      console.log('upload fail', res)
    })

    uploader.on('progress', (res) => {
      this.setData({
        progress: res.progress,
        uploadedSize: parseInt(res.uploadedSize / 1024),
        averageSpeed: parseInt(res.averageSpeed / 1024),
        timeRemaining: res.timeRemaining
      })
    })

    uploader.upload()

    this.uploader = uploader
  },

  reset() {
    this.setData({
      progress: 0,
      uploadedSize: 0,
      averageSpeed: 0,
      timeRemaining: Number.POSITIVE_INFINITY,
    })
  },
  // 重新上传，未写控件
  handleUpload() {
    this.uploader && this.uploader.upload()
  },
  // 暂停上传，未写控件
  handlePause() {
    this.uploader && this.uploader.pause()
  },
  // 恢复上传，未写控件
  handleResume() {
    this.uploader && this.uploader.resume()
  },
  // 取消上传
  handleCancel() {
    this.uploader && this.uploader.cancel()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})