// pages/tab/my/editInfo/editInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetail: {},
    pwdStatus: true,
    telephone: "",
    email: ""
  },

  // 隐藏和显示密码
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
  // 监听手机号码输入事件
  inputTel: function(e) {
    var _this = this;
    _this.setData({
      telephone: e.detail.value
    });
  },
  // 监听电子邮件输入事件
  inputEmail: function(e) {
    var _this = this;
    _this.setData({
      email: e.detail.value
    });
  },
  // 清除手机号码输入框
  clearTel: function() {
    var _this = this;
    _this.setData({
      telephone: ""
    });
  },
  // 清除电子邮件输入框
  clearEmail: function() {
    var _this = this;
    _this.setData({
      email: ""
    });
  },
  // 表单提交
  formSubmit: function(event){
    var _this = this;
    console.log('数据库表对应的主键id', _this.data.userDetail.id);
    console.log('提交了修改个人信息的表单，携带数据为：', event.detail.value);
    wx.request({
      url: getApp().data.url + 'UPDATE_USER_INFO_FOR_ONE',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "id": _this.data.userDetail.id,
        "email": event.detail.value.email,
        "password": event.detail.value.password,
        "telephone": event.detail.value.telephone,
      },
      success: res => {
        console.log(res);
        if(res.data.code == 'SUCCESS'){
          wx.showToast({
            title: '修改成功',
            duration: 1000,
            mask: true,
            complete: wx.navigateBack({
              delta: 1
            })
          });
        }else{
          wx.showToast({
            title: '保存失败',
            duration: 1000,
            mask: true,
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.log(err);
      },
      complete: data => {
        console.log(getApp().data.url + 'UPDATE_USER_INFO_FOR_ONE');
        console.log(data);
      }
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