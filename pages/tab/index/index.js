//index.js
const app = getApp()

Page({
  data: {
    //轮播图
    imgUrls: [
      '../../../images/index_swiper/img1.jpg',
      '../../../images/index_swiper/img2.jpg',
      '../../../images/index_swiper/img3.jpg'
    ],
    //轮播参数
    pic_indicatorDots: true,
    pic_autoplay: true,
    pic_circular: true,
    pic_interval: 3000,
    pic_duration: 1000,
    //导航栏信息
    cores: [
      [
        { path: '/pages/tab/activity/declaration/declaration', openType: "navigate", name: '申报活动', img: "/images/index/icon1.png", color: "#f38181"},
        { path: '/pages/tab/search/search', openType: "switchTab", name: '活动搜索', img: "/images/index/icon2.png", color: "#fce38a"},
        { path: '/pages/tab/activity/record/record', openType: "navigate", name: '申报记录', img: "/images/index/icon3.png", color: "#e8d3ff"},
        { path: 'kjs', openType: "navigate", name: '待定', img: "/images/index/icon4.png", color: "#95e1d3"},
        { path: 'xs', openType: "navigate", name: '学院活动', img: "/images/index/icon5.png", color: "#a8d8ea"},
        { path: '/pages/tab/activity/rank/rank', openType: "navigate", name: '班级排行', img: "/images/index/icon6.png", color: "#aa96da"},
        { path: 'jy', openType: "navigate", name: '待定', img: "/images/index/icon7.png", color: "#fcbad3"},
        { path: 'xf', openType: "navigate", name: '待定', img: "/images/index/icon8.png", color: "#ffd3b5"},
        { path: 'sdf', openType: "navigate", name: '资讯信息', img: "/images/index/icon9.png", color: "#dcedc2"},
        { path: '/pages/tab/my/issues/issues', openType: "navigate", name: '意见反馈', img: "/images/index/icon10.png", color: "#ffaaa6"}
      ], [
        { path: 'cet', name: '测试', img: "", color: ""},
        { path: 'fw', name: "测试", img: "", color: ""}
      ]
    ],
  }
  
})
