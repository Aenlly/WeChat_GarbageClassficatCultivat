// pages/services/pictuclock/pictuclock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picutlocklist: [{
      picutlock_id: 0,
      picutlock_title: "今天的天气真好",
      picutlock_desc: "早睡早起身体好,早睡早起身体好,早睡早起身体好",
      picutlock_img: "/images/index/44.jpg",
      insert_time:"2020-7-8 13:40:42"
    },{
      picutlock_id: 0,
      picutlock_title: "今天的天气真好",
      picutlock_desc: "早睡早起身体好",
      picutlock_img: "/images/mine/arrow.png",
      insert_time:"2020-7-8 13:40:42"
    },{
      picutlock_id: 0,
      picutlock_title: "今天的天气真好",
      picutlock_desc: "早睡早起身体好",
      picutlock_img: "/images/mine/arrow.png",
      insert_time:"2020-7-8 13:40:42"
    },{
      picutlock_id: 0,
      picutlock_title: "今天的天气真好",
      picutlock_desc: "早睡早起身体好",
      picutlock_img: "/images/mine/arrow.png",
      insert_time:"2020-7-8 13:40:42"
    },{
      picutlock_id: 0,
      picutlock_title: "今天的天气真好",
      picutlock_desc: "早睡早起身体好",
      picutlock_img: "/images/mine/arrow.png",
      insert_time:"2020-7-8 13:40:42"
    },{
      picutlock_id: 0,
      picutlock_title: "今天的天气真好",
      picutlock_desc: "早睡早起身体好",
      picutlock_img: "/images/mine/arrow.png",
      insert_time:"2020-7-8 13:40:42"
    },{
      picutlock_id: 0,
      picutlock_title: "今天的天气真好",
      picutlock_desc: "早睡早起身体好",
      picutlock_img: "/images/mine/arrow.png",
      insert_time:"2020-7-8 13:40:42"
    },{
      picutlock_id: 0,
      picutlock_title: "今天的天气真好",
      picutlock_desc: "早睡早起身体好",
      picutlock_img: "/images/mine/arrow.png",
      insert_time:"2020-7-8 13:40:42"
    }
    ]
  },
  // 每日打卡跳转事件
  onClickUrl() {
    wx.navigateTo({
      url: '/pages/packageService/pages/services/pictuclocks/pictuclockadd/pictuclockadd',
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