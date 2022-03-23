// pages/indexs/garbage/garbage.js
const app=getApp()
//获得请求地址
const API_URL=app.globalData.API_URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //资源请求地址
    API_RES_URL:getApp().globalData.API_RES_URL,
    garbage:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: API_URL+'/garbage/getByType',
      data:{
        garbageType: options.garbageType
      },
      success(res){
        let data=res.data
        //判断请求是否成功
        if(data.code==200){
          //转换垃圾信息列表数据，变为4个一集合
          var garbageList=data.data.garbageLists
          let list=[]
          let list2=[]
          for(let i=0,j=0;i<garbageList.length;i++){
            list2[j]=garbageList[i]
            if(j==3){
              list[i/4]=list2
              continue
            }else if(i==garbageList.length-1){
              list[i%4]=list2
            }
            j++
          }
          //重新赋值
          data.data.garbageLists=list
          //设置标题
          wx.setNavigationBarTitle({
            title: data.data.garbageType,
          })
          //设置背景色
          wx.setNavigationBarColor({
            backgroundColor: data.data.bgColor,
            frontColor: '#ffffff',//必须小写
          })
          //设置数据
          that.setData({
            garbage:data.data
          })

        }else{
          //错误提示
          wx.showToast({
            title: '数据请求失败',
            icon:'error'
          })
        }
      }
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

  }
})