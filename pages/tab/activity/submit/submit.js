// pages/tab/activity/submit/submit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    commitData: [],
    commitIds: [],
    userDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      commitData: JSON.parse(options.commitData),
      commitIds: JSON.parse(options.commitIds)
    });
    this.getUserDetailInfo();
  },

  subActivity: function(e){
    let index = e.currentTarget.dataset.index;
    let content = e.currentTarget.dataset.item;
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

  getUserDetailInfo: function(){
    var _this = this;
    const id = getApp().data.userInfo.id;
    if (id) {
      wx.request({
        url: getApp().data.url + '/FIND_USER_DETAIL_INFO_BY_ID/' + id,
        method: 'GET',
        success: res => {
          console.log(res);
          _this.setData({
            userDetail: res.data.data.content[0]
          });
        },
        fail: res => {
        },
        complete: res => {
        }
      });
    }
  },

  submitActivity: function(){
    console.log("点击了提交活动按钮");
    const _this  = this;
    wx.showModal({
      title: "提示",
      content: "确定要提交吗?",
      success(res) {
        if (res.confirm) {
          _this.submitActivityRequest();
        }
      }
    })
  },

  submitActivityRequest: function(){
    console.log("tttttttttttt");
    const _this = this;
    wx.showLoading({
      title: "正在提交，请稍候..."
    });
    wx.request({
      url: getApp().data.url + '/COMMIT_ACTIVITY',
      method: "POST",
      data: {
        "userId": _this.data.userDetail.id,
        "activityIds": _this.data.commitIds
      },
      success: res => {
        wx.showToast({
          title:"成功",
          icon: "success",
          mask: true,
          success: res => {
            wx.hideLoading();
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },1500);
          }
        });
      },
      fail: err => {
        
      },
      complete: data => {
        
      }
    });
  }

})