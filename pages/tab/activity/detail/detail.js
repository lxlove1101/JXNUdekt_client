// pages/tab/activity/detail/detail.js
Page({

  data: {
    activityId: "",
    activityDetail: {}
  },

  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
    });
    this.getActivityDetail();
  },

  getActivityDetail: function(){
    const _this = this;
    wx.request({
      url: getApp().data.url + 'QUERY_ACTIVITY_DETAIL_BY_ID/' + _this.data.activityId,
      method: 'GET',
      success: res => {
        if (res.data.code == 'SUCCESS') {
          _this.setData({
            activityDetail: res.data.data.content
          });
        } else {
          wx.showToast({
            title: '获取信息失败',
            duration: 1000,
            mask: true,
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.log(err);
        wx.showToast({
          title: '获取信息失败',
          duration: 1000,
          mask: true,
          icon: 'none'
        });
      },
      complete: data => {
        console.log(getApp().data.url + 'QUERY_ACTIVITY_TYPE1_BY_ALL');
        console.log(data);
      }
    })
  },

  onUnload: function(){
    console.log("unload");
  }

})