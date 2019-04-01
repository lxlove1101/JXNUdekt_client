// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //当前选中的tab

    activityType1Value: false, //活动类型1picker-value
    activityType1Range: [], //活动类型1picker-range
    activityType2Value: false, //活动类型2picker-value
    activityType2Range: ['请先选择活动类1'], //活动类型2picker-range
    activityType3Value: false, //活动类型3picker-value
    activityType3Range: ['请先选择活动类2'], //活动类型3picker-range

    activityCollegeValue: false, //活动所属学院picker-value
    activityCollegeRange: [], //活动所属学院picker-value

    formData: {
      'type1id': "", //活动一级类Id
      'type2id': "", //活动二级类Id
      'type3id': "", //活动三级类Id
      'collegeId': "", //学院Id
      'name': "" //活动标题关键字
    },

    userSearchData: {
      'userId': "",
      'username': "",
      'page': 1,
      'pageSize': 20
    },

    activityHelpStatus: false,
    userHelpStatus: false
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

  /**
   * 活动搜索脚本
   */
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
  getCollegeRequest: function() {
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
      activityType2Range: activityType2Range,
      'formData.type1id': this.data.activityType1Range[index].id
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
      activityType3Range: activityType3Range,
      'formData.type2id': this.data.activityType2Range[index].id
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
      'formData.type3id': this.data.activityType3Range[index].id
    });
  },
  listenerActivityCollege: function(e) {
    var index = e.detail.value;
    this.setData({
      activityCollegeValue: index,
      'formData.collegeId': this.data.activityCollegeRange[index].id
    });
  },
  listenerTitle: function(e) {
    this.setData({
      'formData.name': e.detail.value
    });
  },

  submitApply: function() {
    var _this = this;
    var emptyCount = 0;
    for (var key in _this.data.formData) {
      if (_this.data.formData[key] == "") {
        emptyCount++;
      }
    }
    if (emptyCount == 5) {
      wx.showToast({
        title: '请至少选择一个条件输入',
        duration: 1000,
        mask: true,
        icon: 'none'
      });
    } else {
      this.setData({
        'formData.page': 1,
        'formData.pageSize': 20
      });
      wx.request({
        url: getApp().data.url + 'QUERY_ACTIVITY_BY_CONDITION',
        method: 'POST',
        data: _this.data.formData,
        header: {
          "Content-Type": "application/json"
        },
        success: res => {
          console.log(res);
          wx.navigateTo({
            url: './searchResult/searchResult?data=' + JSON.stringify(res.data) + '&type=activitySearch',
          });
        },
        fail: err => {
          console.log(err);
          wx.showToast({
            title: '服务器访问失败',
            duration: 1000,
            mask: true,
            icon: 'none'
          });
        },
        complete: data => {
          console.log(getApp().data.url + 'QUERY_ACTIVITY_BY_CONDITION');
          console.log(data);
        }
      });
    }
  },
  showActivityHelp: function () {
    this.setData({
      activityHelpStatus: true
    });
  },
  hideActivityHelp: function () {
    this.setData({
      activityHelpStatus: false
    });
  },
  tapActivityHelp: function (e) {
    if (e.target.id == 'activityHelp') {
      this.hideActivityHelp();
    }
  },

  /**
   * 用户搜索脚本
   */
  bindClearSearchTap: function(e){
    this.setData({
      userSearchInput: ""
    });
  },
  bindSearchInput: function(e){
    this.setData({
      userSearchInput: e.detail.value
    });
  },
  bindConfirmSearchTap: function(e){
    var _this = this;
    var param = e.detail.value.search;
    if (param == null || param == "") {
      wx.showToast({
        title: '请输入学号或姓名进行搜索',
        duration: 1000,
        mask: true,
        icon: 'none'
      });
    } else {
      if(isNaN(param)){
        this.setData({
          'userSearchData.username': param,
          'userSearchData.userId': "",
          'userSearchData.page': 1,
          'userSearchData.pageSize': 20
        });
      }else{
        this.setData({
          'userSearchData.username': "",
          'userSearchData.userId': param,
          'userSearchData.page': 1,
          'userSearchData.pageSize': 20
        });
      }
      
      wx.request({
        url: getApp().data.url + 'QUERY_USER_DETAIL',
        method: 'POST',
        data: this.data.userSearchData,
        success: res => {
          console.log(res);
          wx.navigateTo({
            url: './searchResult/searchResult?data=' + JSON.stringify(res.data) + '&type=userSearch',
          });
        },
        fail: err => {
          console.log(err);
          wx.showToast({
            title: '服务器访问失败',
            duration: 1000,
            mask: true,
            icon: 'none'
          });
        },
        complete: data => {
          console.log(getApp().data.url + 'QUERY_USER_DETAIL/' + param);
          console.log(data);
        }
      });
    }
  },
  showUserHelp: function(){
    this.setData({
      userHelpStatus: true
    });
  },
  hideUserHelp: function(){
    this.setData({
      userHelpStatus: false
    });
  },
  tapUserHelp: function(e){
    if (e.target.id == 'userHelp') {
      this.hideUserHelp();
    }
  }

})