// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //当前选中的tab
    showError: false,

    activityType1Value: false, //活动类型1picker-value
    activityType1Range: [], //活动类型1picker-range
    activityType2Value: false, //活动类型2picker-value
    activityType2Range: ['请先选择活动类1'], //活动类型2picker-range
    activityType3Value: false, //活动类型3picker-value
    activityType3Range: ['请先选择活动类2'], //活动类型3picker-range

    activityCollegeValue: false, //活动所属学院picker-value
    activityCollegeRange: [], //活动所属学院picker-value

  },

  onLoad: function(options) {
    var _this = this;
    _this.getActivityTypeRequest();
    _this.getCollegeRequest();
  },

  // 切换tab事件
  swichNav: function(e) {
    var _this = this;
    if (_this.data.currentTab === e.target.dataset.current) {
      return;
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      });
    }
  },

  // 用户滑动swiper事件
  bindChange: function(e) {
    var _this = this;
    if (e.detail.source == "touch") {
      _this.setData({
        currentTab: e.detail.current
      });
    }
  },
  // 发起请求获取活动类型信息
  getActivityTypeRequest: function() {
    var _this = this;
    wx.request({
      url: getApp().data.url + 'QUERY_ACTIVITY_TYPE_INFO',
      method: 'GET',
      success: res => {
        console.log(res);
        if (res.data.code == 'SUCCESS') {
          _this.setData({
            activityType1Range: res.data.data.content
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
        console.log(getApp().data.url + 'QUERY_ACTIVITY_TYPE_INFO');
        console.log(data);
      }
    });
  },
  //发起请求获取学院基本信息
  getCollegeRequest: function(){
    var _this = this;
    wx.request({
      url: getApp().data.url + 'QUERY_COLLEGE_BY_ALL',
      method: 'GET',
      success: res => {
        console.log(res);
        if (res.data.code == 'SUCCESS') {
          _this.setData({
            activityCollegeRange: res.data.data.content
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
        console.log(getApp().data.url + 'QUERY_COLLEGE_BY_ALL');
        console.log(data);
      }
    });
  },

  listenerActivityType1: function(e) {
    var index = e.detail.value;
    var activityType2Range = this.data.activityType1Range[index].type2List;
    this.setData({
      activityType1Value: index,
      activityType2Value: false,
      activityType2Range: activityType2Range
    });
  },
  listenerActivityType2: function(e) {
    if (!this.data.activityType1Value) {
      app.showErrorModal('请先选择活动一级类', '提醒');
      return;
    }
    var index = e.detail.value;
    var activityType3Range = this.data.activityType2Range[index].type3List;
    this.setData({
      activityType2Value: index,
      activityType3Value: false,
      activityType3Range: activityType3Range
    });
  },
  listenerActivityType3: function(e) {
    if (!this.data.activityType2Value) {
      app.showErrorModal('请先选择活动二级类', '提醒');
      return;
    }
    var index = e.detail.value;
    this.setData({
      activityType3Value: index,
    });
  },
  listenerActivityCollege: function(e) {
    var index = e.detail.value;
    this.setData({
      activityCollegeValue: index,
    });
  },
  listenerTitle: function(e) {

  },

})