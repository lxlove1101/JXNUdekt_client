Page({
  data: {
    //用户信息
    userInfo: getApp().data.userInfo,
    //分类信息
    typeArr: [],
    //当前选择的tab
    currentTab: 0,

    //分类下对应的内容
    contentArr: [],

    //请求的数据体
    reqBody: {
      name: "",
      type1id: 0,
      page: 1,
      pageSize: 20
    },

    hasMore: true,

    commitData: [],
    commitIds: [],
  },

  onShow() {
    var _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    _this.getActivityType1Request(isSuc => {
      if (isSuc) {
        _this.getActivityDetailRequest("", _this.data.typeArr[_this.data.currentTab].id);
      }
    });
  },

  onPullDownRefresh() {
    console.log("触发下拉事件");
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    console.log("触发上拉事件");
  },

  /**
   * 搜索框相关事件
   */
  searchHandle() {
    this.setData({
      //设置data，搜索结果，设置ui
    });
  },
  showSearchHandle() {
    this.setData({
      searchShowed: true
    });
  },
  hideSearchHandle() {
    this.setData({
      searchText: '',
      searchShowed: false
    });
  },
  clearSearchHandle() {
    this.setData({
      searchText: ''
    });
  },
  searchChangeHandle(e) {
    this.setData({
      searchText: e.detail.value
    });
  },
  /**
   * 选择栏事件
   */
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      console.log(this.data.currentTab);
      wx.showLoading({
        title: '加载中...',
      })
      this.setData({
        currentTab: e.target.dataset.current
      });
      this.getActivityDetailRequest("", this.data.typeArr[this.data.currentTab].id);
    }
  },
  bindChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  /**
   * 添加活动/删除活动
   */
  addActivity: function (e) {
    //设置key: isPicked
    let newArray = this.data.contentArr;
    let index = e.currentTarget.dataset.index;
    let content = e.currentTarget.dataset.item;
    content.isPicked = true;
    newArray[index] = content;
    this.setData({
      contentArr: newArray
    });
    //添加选择的数据到数组里
    let data = this.data.commitData;
    let ids = this.data.commitIds;
    data.push(content);
    ids.push(content.id);
    this.setData({
      commitData: data,
      commitIds: ids
    });
    console.log(this.data.commitData);
    console.log(this.data.commitIds);
  },
  subActivity: function (e) {
    //设置key: isPicked
    let newArray = this.data.contentArr;
    let index = e.currentTarget.dataset.index;
    let content = e.currentTarget.dataset.item;
    content.isPicked = false;
    newArray[index] = content;
    this.setData({
      contentArr: newArray
    });
    //从已选择的数组中删除元素
    let data = this.data.commitData;
    let ids = this.data.commitIds;
    let temp = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == content.id) {
        temp = i;
      }
    }
    data.splice(temp, 1);
    if (ids.indexOf(content.id) != -1) {
      ids.splice(ids.indexOf(content.id), 1);
    }
    this.setData({
      commitData: data,
      commitIds: ids
    });
    console.log(this.data.commitData);
    console.log(this.data.commitIds);
  },

  /**
   * 提交栏事件
   */
  submitSelected: function () {
    console.log("点击提交了活动");
    wx.navigateTo({
      url: '../submit/submit?commitData='+JSON.stringify(this.data.commitData)+
           '&commitIds='+JSON.stringify(this.data.commitIds)
    });
  },

  /**
   * request
   */
  getActivityType1Request: function (callback) {
    var _this = this;
    wx.request({
      url: getApp().data.url + 'QUERY_ACTIVITY_TYPE1_BY_ALL',
      method: 'GET',
      success: res => {
        if (res.data.code == 'SUCCESS') {
          _this.setData({
            typeArr: res.data.data.content
          });
        } else {
          wx.showToast({
            title: '获取信息失败',
            duration: 1000,
            mask: true,
            icon: 'none'
          });
        }
        if (typeof callback === 'function') {
          callback(true);
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
  getActivityDetailRequest: function (name, type1id) {
    var _this = this;
    _this.setData({
      "reqBody.name": name,
      "reqBody.type1id": type1id
    });
    wx.request({
      url: getApp().data.url + 'QUERY_ACTIVITY_DETAIL_BY_TYPEID',
      method: 'POST',
      data: _this.data.reqBody,
      success: res => {
        if (res.data.code == 'SUCCESS') {
          _this.setPickerKey(res.data.data.content.list);
          _this.setData({
            hasMore: res.data.data.content.hasNextPage
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
        console.log(getApp().data.url + 'QUERY_ACTIVITY_DETAIL_BY_TYPEID');
        console.log(data);
        wx.hideLoading();
      }
    })
  },

  setPickerKey: function (list) {
    list.forEach(element => {
      if (this.data.commitIds.indexOf(element.id) != -1) {
        element["isPicked"] = true;
      } else {
        element["isPicked"] = false;
      }
    });
    this.setData({
      contentArr: list
    });
    console.log(list);
  },

})