Page({
  data: {
    //用户信息
    userInfo: getApp().data.userInfo,
    //分类信息
    typeArr: [],
    //当前选择的tab
    currentTab: 0,


    commitData: [2, 3

    ],


  },

  onShow(){
    this.getActivityType1Request();
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
  swichNav: function(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  /**
   * 提交栏事件
   */
  submitSelected: function() {
    console.log("点击提交了活动");
  },

  /**
   * request
   */
  getActivityType1Request: function(){
    var _this = this;
    wx.request({
      url: getApp().data.url + 'QUERY_ACTIVITY_TYPE1_BY_ALL',
      method: 'GET',
      success: res => {
        if(res.data.code == 'SUCCESS'){
          _this.setData({
            typeArr: res.data.data.content
          });
        }else{
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
  getActivityDetailRequest: function(){

  }, 

})