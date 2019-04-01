// pages/tab/my/detail/detail.js
Page({

  data: {
    userDetail: {}
  },

  onLoad: function (options) {
    const _this = this;
    wx.request({
      url: getApp().data.url + '/FIND_USER_DETAIL_INFO_BY_ID/' + options.id,
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
  },


})