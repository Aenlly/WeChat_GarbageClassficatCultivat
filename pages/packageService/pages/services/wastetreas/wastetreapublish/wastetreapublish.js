// pages/services/wastetreas/wastetreapublish/wastetreapublish.js
import Uploader from '../../../../../../miniprogram_npm/miniprogram-file-uploader/index'

// 获取应用实例
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL;
var userId = ''

//官方样例地址：https://github.com/wechat-miniprogram/miniprogram-file-uploader/blob/master/example/client/index/index.js
//本地下载样例文件地址：D:\应用数据\Google下载文件\压缩文件\miniprogram-file-uploader-master.zip
const MERGE_URL = API_URL + "/waste-turn-treasure/mergeTmpFile" //合并地址
const UPLOAD_URL = API_URL + "/waste-turn-treasure/uploadTmpVideo" //上传地址

const MB = 1024 * 1024 //视频大小

let uploadArr = []

Page({
  /**
   * 页面的初始数据
   */
  data: {
    form: {
      text: '',
      textDesc: '',
      textTag: '',
      imgUrl: '',
      videoUrl: ''
    },

    rules: [{
      name: 'text',
      rules: {
        required: true,
        maxlength: 20,
        message: "请输入标题",
      }
    }, {
      name: 'text',
      rules: {
        required: true,
        maxlength: 200,
        message: "请输入简介",
      }
    }, {
      name: 'text',
      rules: {
        required: true,
        maxlength: 200,
        message: "请选择标签",
      }
    }, {
      name: 'text',
      rules: {
        required: true,
        maxlength: 20,
        message: "请上传图片",
      }
    }, {
      name: 'text',
      rules: {
        required: true,
        message: "请上传视频",
      }
    }],
    //资源请求地址
    API_RES_URL: getApp().globalData.API_RES_URL,
    image: {
      title: '封面上传',
      tips: '最多上传一张',
      files: [],
      maxSize: 10 * 1024 * 1024. //最大10m
    },
    progress: 0,
    uploadedSize: 0,
    averageSpeed: 0,
    timeRemaining: Number.POSITIVE_INFINITY,
    testChunks: false,
    videoCount: -1,
    errorMsg: ''
  },
  //输入验证
  formInputChange(e) {
    const {
      value
    } = e.currentTarget.dataset
    this.setData({
      [`form.${value}`]: e.detail.value
    })
  },
  //单选按钮组时间
  ridioChage(e) {
    this.setData({
      [`form.textTag`]: e.detail.value
    })
  },
  //表单提交
  submitForm(e) {
    var _this = this
    console.log(_this.data.form)
    var {
      text,
      textDesc,
      textTag,
      imgUrl,
      videoUrl
    } = _this.data.form
    if (text == '' || text == null) {
      _this.setData({
        errorMsg: this.data.rules[0].rules.message
      })
      return
    } else if (textDesc == '' || textDesc == null) {
      _this.setData({
        errorMsg: this.data.rules[1].rules.message
      })
      return
    } else if (textTag == '' || textTag == null) {
      _this.setData({
        errorMsg: this.data.rules[2].rules.message
      })
      return
    } else if (imgUrl == '' || imgUrl == null) {
      _this.setData({
        errorMsg: this.data.rules[3].rules.message
      })
      return
    }else if (videoUrl == '' || videoUrl == null) {
      _this.setData({
        errorMsg: this.data.rules[4].rules.message
      })
      return
    }
    console.log(textTag)
    wx.request({
      url: API_URL+'/waste-turn-treasure/putUserWasteInfo',
      data:{
        userId:userId,
        text:text,
        textDesc:textDesc,
        textTag:textTag,
        imgUrl:imgUrl,
        videoUrl:videoUrl
      },
      method:"POST",

      success(res){
        let data=res.data
        console.log(data)
        if(data.code==200){
          wx.showToast({
            title: '提交成功！',
          })
          wx.navigateBack({
            delta: 1,
          })
        }else{
          wx.showToast({
            title: '提交失败！',
            icon:'error'
          })
        }
      },fial(){
        console.log(text)
      }
    })
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  userId = app.globalData.userId
  if(userId==''||userId==null){
    wx.showToast({
      title: '请先登录！',
      icon:'error'
    })
    wx.navigateBack({
      delta: 1,
    })
  }
  this.chunkSize = 10 * MB
  this.setData({
    //通过bind(this)将函数绑定到this上,以后函数内的this就是指全局页面
    //setdata以后,这两个函数就可以传递给mp-uploader了
    selectImage: this.selectImage.bind(this),
    uploadImage: this.uploadImage.bind(this),
  })
},

onTestChunksChange(e) {
  const value = e.detail.value
  this.data.testChunks = value
},

// 选择视频文件
async chooseVideo() {
    var _this = this
    if (_this.data.videoCount == 0) {
      wx.showToast({
        title: '正在上传！',
      })
      return
    } else if (_this.data.videoCount == 1) {
      wx.showModal({
        title: '警告',
        content: '该操作会覆盖原视频！',
        success(res) {
          if (res.confirm) {
            _this.data.videoCount = -1
            _this.data.form.videoUrl = ''
            _this.chooseVideo()
          } else if (res.cancel) {
            return
          }
        }
      })
      return
    }
    _this.reset()
    const {
      tempFilePath,
      size,
    } = await wx.chooseVideo({
      sourceType: ['album'],
      compressed: false
    })
    _this.data.videoCount = 0
    var obj = tempFilePath.lastIndexOf("/");
    const fileName = tempFilePath.substr(obj + 1)
    if (!Uploader.isSupport()) {
      wx.showToast({
        title: '分片上传在 2.10.0 版本以上支持',
        icon: 'none',
        duration: 3000
      })
      return
    }
    const uploader = new Uploader({
      tempFilePath, //文件
      totalSize: size, //长度
      fileName: fileName, //文件名
      uploadUrl: UPLOAD_URL, //上传地址
      mergeUrl: MERGE_URL, //合并地址
      testChunks: _this.data.testChunks,
      maxConcurrency: 1, //并发上传数，默认 5，最大不超过 10
      verbose: true, //是否输出开始日志，默认 false
      //上传分块时可添加自定义的参数query
      query: {
        userId: userId
      }
    })
    uploader.on('retry', (res) => {
      console.log('retry', res.url)
    })

    uploader.on('complete', (res) => {
      console.log('upload complete', res)
    })

    uploader.on('success', (res) => {
      _this.setData({
        msg: '上传成功',
        videoUrl: res.data,
        videoCount: 1,
        [`form.videoUrl`]: res.data
      })
    })

    uploader.on('fail', (res) => {
      _this.setData({
        msg: '上传失败'
      })
      wx.showToast({
        title: '上传视频失败！',
        icon: 'error'
      })
    })

    uploader.on('progress', (res) => {
      _this.setData({
        progress: res.progress,
        uploadedSize: parseInt(res.uploadedSize / 1024),
        averageSpeed: parseInt(res.averageSpeed / 1024),
        timeRemaining: res.timeRemaining
      })
    })

    uploader.upload()

    _this.uploader = uploader
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
  // 取消上传/删除视频
  handleCancel() {
    var _this=this
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'警告',
      content:'确认删除？删除后无法找回！',
      confirmColor: '#d9534f',
      success(res){
        if (res.confirm) {
          _this.setData({
            msg:'',
            ["form.videoUrl"]:''
          })
          _this.uploader && _this.uploader.cancel()
        }
      }
    })
   
  },

  //选择图片
  selectImage(files) {
    uploadArr = files.tempFilePaths
    console.log(uploadArr)
  },

  //图片上传
  uploadImage(files) {
    var _this = this

    const filePath = uploadArr[0]
    // 图片上传的函数，必须返回Promise
    //Promise的callback里面必须resolve({urls})表示成功，否则表示失败
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: API_URL + '/waste-turn-treasure/uploadImage',
        filePath: filePath,
        name: 'files',
        formData: {
          userId: userId
        },
        header: {
          'content-type': 'multipart/form-data'
        },
        success: (res) => {
          // res.data 是由你们后端返回的相关数据，返回的不是json数据，需要进行转换
          const data = JSON.parse(res.data)

          if (data.code == 200) {
            let urls = [_this.data.API_RES_URL + data.data]
            _this.setData({
              [`form.imgUrl`]: data.data
            })
            // 格式： {urls: ["后端返回的图片地 址"]},传递是数组
            resolve({
              urls: urls
            })
          } else {
            reject('上传图片异常！')
          }
        },
        fial: () => {
          reject('error')
        }
      })
    })
  },

  //图片上传失败
  uploadImageError(e) {
    wx.showToast({
      title: '上传失败!',
      icon: 'error'
    })
  },
  //删除图片
  binddelete(e){
    this.setData({
      ["form.imgUrl"]:''
    })
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