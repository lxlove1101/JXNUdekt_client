// pages/my/my.js
const app = getApp();

Page({
  data: {
    userDetail: {},
    headImg: '../../../images/my/headImg.jpg',
    menu: [
      {
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
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: app.data.url + '/FIND_USER_DETAIL_INFO_BY_ID/' + app.data.userInfo.userId,
      method: 'GET',
      success: res => {
        console.log(res);
        _this.setData(
          {
            userDetail: res.data.data.content[0]
          }
        );
        console.log(_this.data.userDetail);
      },
      fail: res => {

      },
      complete: res => {

      }
    });
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
    const _this = this;
    console.log(app.data.userInfo);
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