/**
 * 用户相关操作
 */

import request from '../utils/request'

/**
 * 登录
 * @param {*} data 用户信息
 */
export const login = data => {
  return request({
    url: 'user/login',
    method: 'POST',
    data
  })
}