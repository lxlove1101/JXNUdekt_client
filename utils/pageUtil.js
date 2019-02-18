// 清除全局数据
function clearGlobalData() {
  var app = getApp();
  app.data.userInfo = {}
  console.log("执行清除数据函数, 结果appData: " + JSON.stringify(app.data));
}

module.exports = {
  clearGlobalData: clearGlobalData
}