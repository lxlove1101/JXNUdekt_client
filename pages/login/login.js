// pages/login/login.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this;
    setTimeout(function() {
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var _this = this;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //监听账号登录
  userInput: function(e) {
    this.data.username = e.detail.value;
  },
  pwdInput: function(e) {
    this.data.password = e.detail.value;
  },
  login: function() {
    console.log("username: " + this.data.username + ", password: " + this.data.password);
    // 登录接口
    if (this.data.username == undefined || this.data.password == undefined) {
      wx.showModal({
        title: '登录提示',
        content: '账号或密码不能为空,请重新输入',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定开始登录验证')
          }
        }
      })
    } else {
      wx.request({
        url: getApp().data.url + 'LOGIN_QUERY',
        method: 'POST',
        data: {
          "userId": this.data.username,
          "password": this.data.password,
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function(res) {
          // 保存sessionid和userName
          // console.log(res.data)
          // getApp().data.sessionId = res.data.object.sessionId
          // getApp().data.userName = res.data.object.userName
          // getApp().data.fyId = res.data.object.fyId
          // getApp().data.shequId = res.data.object.shequId
          // getApp().data.realname = res.data.object.realname
          // getApp().data.fyName = res.data.object.fyName
          // getApp().data.userType = res.data.object.userType
          // getApp().data.rxTime = res.data.object.rxTime
          // getApp().data.njId = res.data.object.njId
          // getApp().data.njName = res.data.object.njName
          // getApp().data.shequName = res.data.object.shequName
          // getApp().data.className = res.data.object.className
          // getApp().data.zyId = res.data.object.zyId
          // getApp().data.zyName = res.data.object.zyName
          // getApp().data.classes = res.data.object.classes
          // getApp().data.bossOperator = res.data.object.bossOperator
          // getApp().data.endOperator = res.data.object.endOperator
          // getApp().data.sqbossOperator = res.data.object.sqbossOperator
          // getApp().data.sqendOperator = res.data.object.sqendOperator
          // getApp().data.userType = res.data.object.userType
          console.log(res);
          if (res.data.code != 'SUCCESS') {
            wx.showModal({
              title: '登录提示',
              content: '网络异常',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          } else {
            if (res.data.data.content.length == 0 || res.data.data.content == null) {
              wx.showModal({
                title: '登录提示',
                content: '用户名或密码错误，请重新登录',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            } else if (res.data.data.content.length == 1) {
              app.data.userInfo = res.data.data.content[0];
              wx.showToast({
                title: '登录成功',
                duration: 2000,
                mask: true,
                complete: wx.switchTab({
                  url: '../index/index',
                })
              });
            }
          }
        },
        fail: function(err) {

        },
        complete: function(data) {

        }
      })
    }
  },
  inputFocus: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  showHelp: function(e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e) {
    this.setData({
      'help_status': false
    });
  },
  // btn: function() {
  //   wx.request({
  //     url: "https://scx.eurasia.edu:81/mtmc-wx/ws/business/phoneCodeQry/",
  //     method: 'POST',
  //     data: {
  //       "params": {
  //         "openId": "111",
  //         "phoneNum": "17868804701"
  //       }
  //     },
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     success: function(res) {
  //       console.log(res.data);
  //       wx.showToast({
  //         title: '获取验证码成功',
  //         duration: 2000
  //       })
  //     },
  //     fail: function(err) {
  //       console.log(err)
  //     },
  //     complete: function(data) {
  //       console.log(data)
  //     }
  //   });
  // }
})