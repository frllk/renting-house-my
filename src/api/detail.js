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

/**
 * 获取是否收藏状态
 * @param {*} id id
 */
export const getHouseFavorite = id => request({
  url: `user/favorites/${id}`
})

/**
 * 添加收藏
 * @param {*} id id
 */
export const addFavorite = id => request({
  url: `user/favorites/${id}`,
  method: 'POST'
})

/**
 * 取消收藏
 * @param {*} id id
 */
export const deleteFavorite = id => request({
  url: `user/favorites/${id}`,
  method: 'DELETE'
})