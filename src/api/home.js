import request from '../utils/request.js'

/**
 * 获取轮播图
 */
export const getSwiper = () => {
  return request({
    url: 'home/swiper'
  })
}

/**
 * 获取租房小组
 * @param {*} area 地区的id
 */
export const getGroups = (area = 'AREA%7C88cff55c-aaa4-e2e0') => {
  return request({
    url: 'home/groups',
    data: { area }
  })
}
/**
 * 获取咨询
 * @param {*} area 地区的id
 */
export const getNews = (area = 'AREA%7C88cff55c-aaa4-e2e0') => {
  return request({
    url: 'home/news',
    data: { area }
  })
}