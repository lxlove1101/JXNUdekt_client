// pages/tab/search/searchResult/searchResult.js
Page({

  data: {
    routeType: "",
    routeData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = JSON.parse(options.data);
    this.setData({
      routeType: options.type,
      routeData: obj
    });
    console.log(this.data);
  },

})