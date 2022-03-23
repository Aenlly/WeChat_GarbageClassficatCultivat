// pages/packageService/pages/services/knowtests/answereveryday/Answereveryday.js
const app = getApp()
//获得请求地址
const API_URL = app.globalData.API_URL
var userId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '每日答题',
    topics: [{
      topic_id: 0,
      topic_name: "1、以下哪个是可回收垃圾？",
      analysis: "因为塑料瓶属于可再利用",
      option: [{
        option_id: 1,
        option_name: "A、贝壳",
        iscorrect: false,
      }]
    }, {
      topic_id: 2,
      topic_name: "2、以下哪个是可回收垃圾？",
      option: [{
        option_id: 1,
        option_name: "A、贝壳",
        iscorrect: false,
      }]
    }],
    //正确选项的样式
    correct: {
      id: 0, //正确选项编号
      background: "#6ac461",
    },
    //错误选项的样式
    nocorrect: {
      id: 0, //正确选项编号
      background: "#fa5151", //样式
    },
    topic_index: 0, //题目索引
    option_selet: 0, //题目选项
    //按钮信息
    btninfo: {
      isanalysis: true, //是否显示解析，默认不显示
      isbtn: true, //是否显示按钮，默认不显示
      next_btn: "下一题",
      ischeck: false, //选项是否可点击
      first: 1, //第一次交卷
    },
    randomIndex: '', //随机组卷批次号
    countdown: 10,
    // interval: "",
  },

  /**
   * 选项事件
   * @param {*} e 
   */
  optionCheck(e) {
    var _this = this
    var btninfo = _this.data.btninfo
    if (!btninfo.ischeck) {
      var topiclength = _this.data.topics.length
      var topic_index = _this.data.topic_index
      var correct = _this.data.correct
      var nocorrect = _this.data.nocorrect
      // 选择了选项后同时清除定时器
      // clearInterval(_this.data.interval);

      //获得选择选项的id
      var option_select = e.target.id
      btninfo.isanalysis = false
      btninfo.isbtn = false
      btninfo.ischeck = true

      wx.request({
        url: API_URL + '/answer-question/isCorrect',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': userId
        },
        data: {
          topicId: _this.data.topics[topic_index].belongTopicId,
          optionId: option_select,
          randomIndex: _this.data.randomIndex
        },
        success(res) {
          let data = res.data
          if (data.code == 200) {
            console.log(data)
            //正确选项样式
            correct.id = data.data
            // 判断是否正确
            if (option_select != data.data) {
              //错误选项样式
              nocorrect.id = option_select
            }
            // 判断下一题是否为最后一题
            if (topic_index + 1 == topiclength) {
              btninfo.next_btn = "交卷"
            }
            // 修改数据
            _this.setData({
              correct: correct,
              nocorrect: nocorrect,
              btninfo: btninfo
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
              title: '服务器异常！',
              icon: 'error',
              mask: true
            })
          }
        }
      })
    }
  },
  // 按钮事件
  btnClick(e) {
    var _this = this
    var topic_index = _this.data.topic_index
    var btninfo = _this.data.btninfo
    // 判断按钮的文本
    if (_this.data.btninfo.next_btn == "下一题") {
      topic_index++ //题目索引增加
      btninfo.isbtn = true //设置下一题按钮隐藏
      btninfo.ischeck = false //设置选项按钮可单击
      btninfo.isanalysis = true //设置解析隐藏

      _this.setData({
        // countdown: 10,
        topic_index: topic_index,
        btninfo: btninfo,
        correct: {
          id: 0,
          background: "#6ac461",
        },
        nocorrect: {
          id: 0,
          background: "#fa5151",
        },
      })
      // _this.startInterval()
    }
    // 第一次点交卷才有效果
    else if (btninfo.first == 1) {
      btninfo.first = 0
      _this.setData({
        btninfo: btninfo
      })
      // 交卷请求
      wx.request({
        url: API_URL + '/answer-question/submitPaper', //api地址
        header: {
          'token': userId
        },
        data: {
          randomIndex: _this.data.randomIndex
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          let data = res.data
          if (data.code == 200) {
            if (data.data) {
              wx.showToast({
                title: "交卷成功",
                mask: true
              })
              // 延迟自动返回
              setTimeout(function (e) {
                wx.navigateBack()
              }, 500)
            } else {
              wx.showToast({
                title: "交卷失败",
                icon: 'error',
                mask: true
              })
            }
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
              title: "服务器异常！",
              icon: 'error',
              mask: true
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: "交卷失败",
            icon: 'error',
            mask: true
          })
        }
      })
    }
  },

  /* 去除倒计时功能
  // 启动定时器
  startInterval: function (e) {
    var _this = this
    var countdown = _this.data.countdown
    var topiclength = _this.data.topics.length
    var topic_index = _this.data.topic_index
    var btninfo = _this.data.btninfo
    var optionlist = _this.data.topics[topic_index].option
    var correct = _this.data.correct
    // 设置定时器/1s执行一次，并且获得返回值用于清除
    var interval = setInterval(function () {
      // 时间为0时执行
      if (_this.data.countdown == 0) {
        btninfo.isbtn = false
        btninfo.ischeck = true
        // 匹配正确项
        for (var index in optionlist) {
          if (optionlist[index].iscorrect) {
            correct.id = optionlist[index].option_id
            break
          }
        }
        // 判断下一题是否为最后一题
        if (topic_index + 1 == topiclength) {
          btninfo.next_btn = "交卷"
        }
        // 清除定时器
        _this.setData({
          btninfo: btninfo,
          correct: correct
        })
        clearInterval(_this.data.interval);
      } else {
        countdown--
        _this.setData({
          countdown: countdown,
        })
      }
    }, 1000)
    _this.setData({
      interval: interval,
    })
  },*/

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    userId = app.globalData.userId
    if (userId == null || userId == '') {
      wx.showToast({
        title: '请先登录！',
        icon: 'error',
        mask: true
      })
      return
    } else {
      wx.request({
        url: API_URL + '/answer-question/getTopics',
        header: {
          'token': userId
        },
        data: {
          randomIndex: options.index
        },
        success(res) {
          let data = res.data
          console.log(data)
          if (data.code == 200) {
            _this.setData({
              topics: data.data,
              randomIndex: options.index
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
              title: '请求数据异常！',
              icon: 'error',
              mask: true
            })
          }
        }
      })
    }
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
    // this.startInterval()
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

  }
})