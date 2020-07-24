/**
 * 城市列表
 */

import request from '../utils/request'

/**
 * 获取城市列表数据
 */
export const getCityList = () => {
  return request({
    url: 'area/city?level=1'
  })
}
/**
 * 获取热门城市
 */
export const getHotCityList = () => {
  return request({
    url: '/area/hot'
  })
}

/**
 * 根据城市名称获取城市信息
 * @param {*} cityName 城市名称
 */
export const getCityInfo = (cityName) => {
  return request({
    url: '/area/info?name=' + cityName
  })
}