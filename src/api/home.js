import request from '../utils/request.js'

/**
 * 获取轮播图
 */
export const getSwiper = () => {
  return request({
    url: 'home/swiper'
  })
} 