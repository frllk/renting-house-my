/**
 * 出租相关操作
 */

import request from '../utils/request'

/**
 * 获取已发布房源
 */
export const getMyRentList = () => request({
  url: 'user/houses'
})

/**
 * 小区关键词查询
 * @param {*} id 当前定位城市id
 * @param {*} name 关键词
 */
export const getCommunity = (id, name) => request({
  url: 'area/community',
  params: {
    id, name
  }
})