// pages/services/wikis/wikis/wikis.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wiki:{
      wiki_id:0,
      wiki_title:"为什么要垃圾分类",
      wiki_context: `<div style="box-sizing:border-box;padding:20px"><section style="text-align:center;margin:0px auto"><section style="border-radius:4px;border:1px solid #757576;display:inline-block;padding:5px 20px"><span style="font-size:18px;color:#595959">表格</span></section></section><section style="margin-top:1.5em"><div style="overflow-x:auto;padding:1px"><table cellspacing="0" cellpadding="5" style="width:100%;box-sizing:border-box;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5;border-spacing:0px"><thead><tr><th style="border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">标题 1</th><th style="border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">标题 2</th></tr></thead><tbody><tr><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 1</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 2</td></tr><tr style="background-color:#f6f8fa"><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 3</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5"><a>链接</a></td></tr><tr><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 5</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 6</td></tr></tbody></table></div><div style="font-size:12px;color:gray;text-align:center;margin-top:5px">普通表格</div></section><section style="margin-top:1.5em"><div style="overflow-x:auto;padding:1px"><table cellspacing="0" cellpadding="5" style="width:500px;box-sizing:border-box;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5;border-spacing:0px"><thead><tr><th style="border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">标题 1</th><th style="border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">标题 2</th><th style="border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">标题 3</th><th style="border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">标题 4</th><th style="border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">标题 5</th></tr></thead><tbody><tr><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 1</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 2</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 3</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 4</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 5</td></tr><tr style="background-color:#f6f8fa"><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5"><a>链接</a></td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 7</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 8</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 9</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 10</td></tr><tr><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 11</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 12</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 13</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 14</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5">内容 15</td></tr></tbody></table></div><div style="font-size:12px;color:gray;text-align:center;margin-top:5px">长表格，可以单独横向滚动</div></section><section style="margin-top:1.5em"><div style="overflow-x:auto;padding:1px"><table cellspacing="0" cellpadding="5" style="width:100%;box-sizing:border-box;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5;"><tr><th style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">标题 1</th><th style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">标题 2</th><th style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">标题 3</th></tr><tr><td colspan="2" style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">内容 1</td><td rowspan="2" style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">内容 2</td></tr><tr><td rowspan="2" style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">内容 3</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">内容 4</td></tr><tr><td colspan="2" style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">内容 5</td></tr><tr><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">内容 6</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;">内容 7</td><td style="text-align:center;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;"><a>链接</a></td></tr></table></div><div style="font-size:12px;color:gray;text-align:center;margin-top:5px">含有合并单元格的表格</div></section><ad style="margin-top:2em" unit-id="adunit-bb2f664ec0e5875c"></ad><section id="list" style="text-align:center;margin:0px auto;margin-top:2em"><section style="border-radius:4px;border:1px solid #757576;display:inline-block;padding:5px 20px"><span style="font-size:18px;color:#595959">列表</span></section></section><section style="margin-top:1.5em"><ol style="margin-bottom:1.5em"><li style="margin:5px 0">这是第一条列表项</li><li style="margin:5px 0">这是第二条列表项</li><li style="margin:5px 0">这是第三条 <a>链接</a></li></ol><ol style="list-style-type:upper-alpha;margin-bottom:1.5em"><li style="margin:5px 0">这是第一条列表项</li><li style="margin:5px 0">这是第二条列表项</li><li style="margin:5px 0">这是第三条 <a>链接</a></li></ol><ol style="list-style-type:upper-roman;margin-bottom:1.5em"><li style="margin:5px 0">这是第一条列表项</li><li style="margin:5px 0">这是第二条列表项</li><li style="margin:5px 0">这是第三条 <a>链接</a></li></ol><ul><li style="margin:5px 0">第一级无序列表</li><li style="margin:5px 0">第一级无序列表 <ul><li style="margin:5px 0">第二级无序列表</li><li style="margin:5px 0">第二级无序列表 <ul><li style="margin:5px 0">第三级无序列表</li><li style="margin:5px 0">第三级 <a>链接</a></li></ul></li></ul></li></ul></section><section style="text-align:center;margin:0px auto;margin-top:2em"><section style="border-radius:4px;border:1px solid #757576;display:inline-block;padding:5px 20px"><span style="font-size:18px;color:#595959">文本</span></section></section><section style="margin-top:1.5em"><p style="margin-bottom:1em"><span><span style="display:inline-block;text-align:center"><div style="font-size:50%;">pin</div> 拼</span><span style="display:inline-block;text-align:center"><div style="font-size:50%;">yin</div> 音</span></span> &nbsp;&nbsp;<i>斜体</i> &nbsp;&nbsp;<b>粗体</b> &nbsp;&nbsp;上标<sup>1</sup> &nbsp;&nbsp;下标<sub>2</sub></p><p style="margin-bottom:1em"><span style="text-decoration:overline">上划线</span> &nbsp;&nbsp;<span style="text-decoration:line-through">中划线</span> &nbsp;&nbsp;<span style="text-decoration:underline">下划线</span></p><p><span style="display:inline;font-size:1.2em">大一号</span> &nbsp;&nbsp;<span>正常</span> &nbsp;&nbsp;<span style="display:inline;font-size:0.8em">小一号</span></p><h2 style="margin-top:0.5em">大标题</h2><h3 style="margin-top:0.5em">中标题</h3><h4 style="margin-top:0.5em">小标题</h4></section><section style="text-align:center;margin:0px auto;margin-top:2em"><section style="border-radius:4px;border:1px solid #757576;display:inline-block;padding:5px 20px"><span style="font-size:18px;color:#595959">链接</span></section></section><section style="margin-top:1.5em;text-align:center"><a href="#">跳转到顶部</a>&nbsp;&nbsp;&nbsp;<a href="#list">跳转到列表</a><div style="font-size:12px;color:gray;margin-top:5px">锚点链接，将滚动到对应位置</div></section><section style="margin-top:1.5em;text-align:center"><a href="https://github.com/jin-yufeng/mp-html">外部链接</a><div style="font-size:12px;color:gray;margin-top:5px">外部链接，将复制链接</div></section><section style="margin-top:1.5em;text-align:center"><a href="/pages/docs/docs?index=0">内部链接</a><div style="font-size:12px;color:gray;margin-top:5px">内部链接，将跳转页面</div></section><section style="text-align:center;margin:0px auto;margin-top:2em"><section style="border-radius:4px;border:1px solid #757576;display:inline-block;padding:5px 20px"><span style="font-size:18px;color:#595959">图片</span></section></section><section style="margin-top:1.5em;text-align:center"><img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo/demo-thumb.jpg?sign=91b3e495d16f96a0df3d263c9ff95821&t=1609059235" origin-src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo/demo.jpg?sign=af7082bed28711177bd952dbab67373e&t=1609059255" width="480"><div style="font-size:12px;color:gray;margin-top:5px">点击预览高清图</div></section><section style="margin-top:1.5em;text-align:center"><svg style="enable-background:new 0 0 50 50;" width="40px" height="40px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg><div style="font-size:12px;color:gray;margin-top:5px">svg 动画</div></section></div><div style="text-align:center"><video controls src="https://haokan.baidu.com/v?vid=15436553312234711669&pd=pcshare"></div>`,
      insert_time:'2017-8-9'
    }
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