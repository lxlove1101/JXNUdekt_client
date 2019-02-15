//index.js
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../images/index_swiper/img1.jpg',
      '../../images/index_swiper/img2.jpg',
      '../../images/index_swiper/img3.jpg'
    ],
    remind: '加载中',
    pic_indicatorDots: true,
    pic_autoplay: true,
    pic_circular: true,
    pic_interval: 3000,
    pic_duration: 1000,
    cores: [
      [
        { id: 'kb', name: '课表查询'},
        { id: 'cj', name: '成绩查询'},
        { id: 'ks', name: '考试安排'},
        { id: 'kjs', name: '空教室'},
        { id: 'xs', name: '学生查询'},
        { id: 'ykt', name: '一卡通'},
        { id: 'jy', name: '借阅信息'},
        { id: 'xf', name: '学费信息'},
        { id: 'sdf', name: '电费查询'},
        { id: 'bx', name: '物业报修'}
      ], [
        { id: 'cet', name: '四六级'},
        { id: 'fw', name: "志愿活动"}
      ]
    ]
  }
  
})
