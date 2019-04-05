// pages/tab/my/issues/issues.js
Page({

  data: {
    title: "",
    content: "",

    feedbackData: [],

    showError: false
  },

  onLoad: function (options) {
    this.getFeedbackCommitDataByUserId();
  },

  getFeedbackCommitDataByUserId: function(){
    const _this = this;
    wx.request({
      url: getApp().data.url + "QUERY_FEEDBACK_BY_USERID/" + getApp().data.userInfo.id,
      method: "GET",
      success: res => {
        console.log(res);
        _this.setData({
          feedbackData: res.data.data.content
        });
      },
      fail: err => {
        console.log(err);
      },
      complete: data => {
        console.log(getApp().data.url + "QUERY_FEEDBACK_BY_USERID/" + getApp().data.userInfo.id);
        console.log(data);
      }
    });
  },

  listenerTitle: function (e) {
    this.setData({
      'title': e.detail.value
    });
  },

  listenerTextarea: function (e) {
    this.setData({
      'content': e.detail.value
    });
  },

  submit: function () {
    const _this = this;
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    const reqData = {
      userId: getApp().data.userInfo.id,
      title: _this.data.title,
      information: _this.data.content
    };
    wx.request({
      url: getApp().data.url + 'COMMIT_FEEDBACK',
      method: "POST",
      data: reqData,
      success: res => {
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: "提交成功",
          icon: "success",
          mask: true,
          duration: 1000,
          success: res => {
            setTimeout(()=> {
              wx.navigateBack({
                delta:  1
              });
            }, 1000);
          }
        });
      },
      fail: err => {
        console.log(err);
      },
      complete: data => {
        console.log(getApp().data.url + 'COMMIT_FEEDBACK');
        console.log(data);
      }
    });
  },

})