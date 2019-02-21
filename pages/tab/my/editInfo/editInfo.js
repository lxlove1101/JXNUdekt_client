// pages/tab/my/editInfo/editInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetail: {},
    pwdStatus: false,
    telephone: "",
    email: ""
  },

  showHidePwd: function() {
    var _this = this;
    if (_this.data.pwdStatus) {
      _this.setData({
        pwdStatus: false
      });
    } else {
      _this.setData({
        pwdStatus: true
      });
    }
  },

  inputTel: function(e) {
    var _this = this;
    _this.setData({
      telephone: e.detail.value
    });
  },

  inputEmail: function(e) {
    var _this = this;
    _this.setData({
      email: e.detail.value
    });
  },

  clearTel: function() {
    var _this = this;
    _this.setData({
      telephone: ""
    });
  },

  clearEmail: function() {
    var _this = this;
    _this.setData({
      email: ""
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    _this.setData({
      userDetail: JSON.parse(options.data),
    });
    console.log("编辑页面获取到的data:");
    console.log(_this.data);
    if (_this.data.userDetail.telephone && _this.data.userDetail.email) {
      _this.setData({
        telephone: _this.data.userDetail.telephone,
        email: _this.data.userDetail.email
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;
    if (_this.data.userDetail.telephone && _this.data.userDetail.email) {
      _this.setData({
        telephone: _this.data.userDetail.telephone,
        email: _this.data.userDetail.email
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})