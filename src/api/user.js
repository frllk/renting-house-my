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

/**
 * 获取用户信息
 */
export const getUserInfo = () => request({
  url: 'user'
})

/**
 * 用户退出
 */
export const userLogout = () => request({
  url: 'user/logout',
  method: 'POST'
})