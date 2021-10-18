// pages/packageService/pages/services/knowtests/answereveryday/Answereveryday.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerveryday: {
      question_id: 1,
      question_type: 1,
      topic: [
        {
          topic_id: 0,
          topic_name: "1、以下哪个是可回收垃圾？",
          option: [{
            option_id: 1,
            option_name: "A、贝壳",
            iscorrect: false,
          }, {
            option_id: 2,
            option_name: "B、电池",
            iscorrect: false,
          }, {
            option_id: 3,
            option_name: "C、菜叶",
            iscorrect: false,
          }, {
            option_id: 4,
            option_name: "D、塑料瓶",
            iscorrect: true,
          }]
        }, {
          topic_id: 2,
          topic_name: "2、以下哪个是可回收垃圾？",
          option: [{
            option_id: 1,
            option_name: "A、贝壳",
            iscorrect: false,
          }, {
            option_id: 2,
            option_name: "B、电池",
            iscorrect: false,
          }, {
            option_id: 3,
            option_name: "C、菜叶",
            iscorrect: false,
          }, {
            option_id: 4,
            option_name: "D、塑料瓶",
            iscorrect: true,
          }]
        }
      ]
    },
    correct: {
      id: 0,
      background: "#367bf6",
    },
    nocorrect: {
      id: 0,
      background: "red",
    },
    topic_index: 0,
    option_selet: 0,
    btninfo: {
      isbtn: true,
      next_btn: "下一题",
      ischeck: false,
      first: 1,
    },
    countdown: 10,
    interval: "",
  },

  // 选择操作
  optionCheck(e) {
    var _this = this
    var btninfo = _this.data.btninfo
    if (!btninfo.ischeck) {
      var topiclength = _this.data.answerveryday.topic.length
      var topic_index = _this.data.topic_index
      var correct = _this.data.correct
      var nocorrect = _this.data.nocorrect
      // 选择了选项后同时清除定时器
      clearInterval(_this.data.interval);
      var option_select = e.target.id
      btninfo.isbtn = false
      btninfo.ischeck = true
      console.log(e)
      // 每一题的get请求
      wx.request({
        url: '', //api地址
        data: {
          topic_id: 0,
          option_id: 0,
          user_id: 0,
          bequestion: 0
        },
        success(res) {
          console.log(res.data)
        }
      })
      // 判断是否正确
      if (e.target.dataset.iscorrect) {
        correct.id = option_select
      } else {
        var optionlist = _this.data.answerveryday.topic[topic_index].option
        // 匹配正确项
        for (var index in optionlist) {
          if (optionlist[index].iscorrect) {
            correct.id = optionlist[index].option_id
            break
          }
        }
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
    }
  },
  // 按钮事件
  btnClick(e) {
    var _this = this
    var topic_index = _this.data.topic_index
    var btninfo = _this.data.btninfo
    // 判断按钮的文本
    if (_this.data.btninfo.next_btn == "下一题") {
      topic_index++
      btninfo.isbtn = true
      btninfo.ischeck = false
      _this.setData({
        countdown: 10,
        topic_index: topic_index,
        btninfo: btninfo,
        correct: {
          id: 0,
          background: "#367bf6",
        },
        nocorrect: {
          id: 0,
          background: "red",
        },
      })
      _this.startInterval()
    }
    // 第一次点交卷才有效果
    else if (btninfo.first == 1) {
      btninfo.first = 0
      _this.setData({
        btninfo: btninfo
      })
      // 交卷请求
      wx.request({
        url: '', //api地址
        data: {
          topic_id: 0,
          option_id: 0,
          user_id: 0,
          bequestion: 0
        },
        success(res) {
          wx.showToast({
            title: "交卷成功",
            mask: true
          })
          // 延迟自动返回
          setTimeout(function (e) { wx.navigateBack() }, 1500)
          console.log(res.data)
        }
        , fail: function () {
          wx.showToast({
            title: "交卷失败",
            mask: true
          })
        }
      })
    }
  },

  // 启动定时器
  startInterval: function (e) {
    var _this = this
    var countdown = _this.data.countdown
    var topiclength = _this.data.answerveryday.topic.length
    var topic_index = _this.data.topic_index
    var btninfo = _this.data.btninfo
    var optionlist = _this.data.answerveryday.topic[topic_index].option
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.startInterval()
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