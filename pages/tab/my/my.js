// pages/my/my.js
const app = getApp();
const util = require('../../../utils/util.js');

Page({
  data: {
    userDetail: {},
    headImg: '../../../images/my/headImg.jpg',
    menu: [{
        tag: 'setting',
        name: '设置'
      },
      {
        tag: 'contact_us',
        name: '联系我们'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
    const id = app.data.userInfo.id;
    if (id) {
      wx.request({
        url: app.data.url + '/FIND_USER_DETAIL_INFO_BY_ID/' + id,
        method: 'GET',
        success: res => {
          console.log(res);
          _this.setData({
            userDetail: res.data.data.content[0]
          });
          console.log(_this.data.userDetail);
        },
        fail: res => {

        },
        complete: res => {

        }
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

  },

  editEvent: function(){
    console.log("用户点击编辑个人信息");
    var _this = this;
    wx.navigateTo({
      url: './editInfo/editInfo?data='+JSON.stringify(_this.data.userDetail),
    });
  },

  // 退出登录点击事件
  exit: function() {
    console.log("用户退出了登录");
    util.pageUtil.clearGlobalData();
    wx.redirectTo({
      url: '../../login/login',
      success: res => {
        console.log(res);
      },
      fail: res => {
        console.log(res);
      },
    });
  },

})