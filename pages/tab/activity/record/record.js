Page({
  data: {
    filterdata: {},  //筛选条件数据
    showfilter: false, //是否显示下拉筛选
    showfilterindex: null, //显示哪个筛选类目

    semesterIndex: 0,
    semesterId: 1,

    scrolltop: null, //滚动位置
  },
  onLoad: function () {
    this.fetchFilterData();
    this.fetchRankData();
  },
  fetchFilterData: function () { //获取筛选条件
    this.setData({
      filterdata: {
        "semester": [
          {
            "id": 1,
            "title": "第一学期"
          },
          {
            "id": 2,
            "title": "第二学期"
          },
          {
            "id": 3,
            "title": "第三学期"
          },
          {
            "id": 4,
            "title": "第四学期"
          },
          {
            "id": 5,
            "title": "第五学期"
          },
          {
            "id": 6,
            "title": "第六学期"
          },
          {
            "id": 7,
            "title": "第七学期"
          },
          {
            "id": 8,
            "title": "第八学期"
          },
        ]
      }
    });
  },

  fetchRankData: function () {
    const _this = this;
    wx.request({
      url: getApp().data.url + 'RANK_INFO_BY_CLASS?classId=' + getApp().data.userInfo.classId +
        '&semester=' + _this.data.semesterId +
        '&type=' + _this.data.typeId,
      method: 'GET',
      success: res => {
        console.log(res);
        _this.setData({
          rankList: res.data.data.content
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
        console.log(getApp().data.url + 'RANK_INFO_BY_CLASS?classId=' + getApp().data.userInfo.classId +
          '&semester=' + _this.data.semesterId +
          '&type=' + _this.data.typeId);
        console.log(data);
      }
    });
  },

  setFilterPanel: function (e) { //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if (d.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
  },

  setSemesterIndex: function (e) {
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      semesterIndex: dataset.semesterindex,
      semesterId: dataset.semesterid,
    });
    this.hideFilter();
    this.fetchRankData();
  },

  hideFilter: function () { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },

  scrollHandle: function (e) { //滚动事件
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },

})