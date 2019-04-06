Page({
  data: {
    filterdata: {},  //筛选条件数据
    showfilter: false, //是否显示下拉筛选
    showfilterindex: null, //显示哪个筛选类目

    semesterIndex: 0,
    semester: [],

    commitedData: [],
    score: 0,

    scrolltop: null, //滚动位置
  },
  onLoad: function () {
    this.fetchSemesterData();
  },

  fetchSemesterData: function () {
    const _this = this;
    wx.request({
      url: getApp().data.url + 'QUERY_SEMESTER',
      method: 'GET',
      success: res => {
        console.log(res);
        let semesterData = res.data.data.content;
        let userGrade = getApp().data.userInfo.userId.substring(0, 4);
        let userSemester = [];
        let startIndex = 0;
        for (let i = 0; i < semesterData.length; i++) {
          if (semesterData[i].semester.substring(0, 4) == userGrade) {
            startIndex = i;
            break;
          }
        }
        for (let j = startIndex; j < startIndex + 8; j++) {
          userSemester.push(semesterData[j]);
        }
        _this.setData({
          semester: userSemester
        });
        _this.fetchActivityCommitData();
        _this.fetchScoreBySemester();
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
        console.log(getApp().data.url + 'QUERY_SEMESTER'),
          console.log(data);
      }
    });
  },

  fetchActivityCommitData: function () {
    const _this = this;
    console.log(typeof _this.data.semester[_this.data.semesterIndex].startTime);
    wx.request({
      url: getApp().data.url + 'QUERY_ACTIVITY_COMMIT?startTime=' + /\d{4}-\d{1,2}-\d{1,2}/g.exec(_this.data.semester[_this.data.semesterIndex].startTime)[0]
        + '&endTime=' + /\d{4}-\d{1,2}-\d{1,2}/g.exec(_this.data.semester[_this.data.semesterIndex].endTime)[0]
        + '&userId=' + getApp().data.userInfo.id,
      method: 'GET',
      success: res => {
        console.log(res.data.data.content);
        _this.setData({
          commitedData: res.data.data.content
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
        console.log(data);
      }
    });
  },

  fetchScoreBySemester: function () {
    const _this = this;
    let semester = this.data.semesterIndex + 1;
    wx.request({
      url: getApp().data.url + 'QUERY_SEMESTER_SCORE_BY_USER?userId=' + getApp().data.userInfo.id + '&semester=' + semester,
      method: "GET",
      success: res => {
        console.log(res);
        if (res.data.data.content) {
          _this.setData({
            score: res.data.data.content.score
          });
        }
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
        console.log(getApp().data.url + 'QUERY_SEMESTER_SCORE_BY_USER?userId=' + getApp().data.userInfo.id + '&semester=' + semester);
        console.log(data);
      }
    })
  },

  cancelCommit: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "是否取消申报该活动?",
      showCancel: true,
      success: res => {
        if (res.confirm) {
          wx.request({
            url: getApp().data.url + 'CANCEL_COMMIT_ACTIVITY_BY_ID/' + id,
            method: "GET",
            success: res => {
              console.log(res);
              if (res.data.code == "SUCCESS") {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                });
                setTimeout(() => { this.fetchActivityCommitData(); }, 1500);
              } else {
                wx.showToast({
                  title: '失败',
                  icon: 'none',
                  duration: 1500,
                  mask: true
                });
                setTimeout(() => { this.fetchActivityCommitData(); }, 1500);
              }
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
              console.log(getApp().data.url + 'CANCEL_COMMIT_ACTIVITY_BY_ID/' + id);
              console.log(data);
            }

          });
        } else if (res.cancel) {

        }
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
    });
    this.hideFilter();
    this.fetchActivityCommitData();
    this.fetchScoreBySemester();
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