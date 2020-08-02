/**
 * 房屋详情相关接口
 */

import request from '../utils/request'

/**
 * 获取房屋信息
 * @param {*} id id
 */
export const getHouseInfo = id => {
  return request({
    url: `/houses/${id}`
  })
}