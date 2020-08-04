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