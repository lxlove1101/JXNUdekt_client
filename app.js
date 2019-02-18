//app.js
App({
  data: {
    url: 'http://localhost/API/',
    userInfo: {}
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onError(msg) {
    console.log(msg);
  },
  onPageNotFound(res) {
    // wx.redirectTo({
    //   url: 'pages/...'
    // }) // 如果是 tabbar 页面，请使用 wx.switchTab
  },

  globalData: {
    userInfo: null
  },

  util: require('./utils/util'),
  key: function(data) {
    return this.util.key(data)
  },
  enCodeBase64: function(data) {
    return this.util.base64.encode(data)
  },

  // 清除全局数据
  clearData: function(){
    this.userInfo = {};
    console.log("执行清除数据函数, 结果appData: " + JSON.stringify(this.data));
  },
})