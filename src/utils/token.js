/**
 * token相关操作
 */

const KEY = 'hkzf_token'

/**
 * 设置token
 * @param {*} token token
 */
export const setToken = token => {
  localStorage.setItem(KEY, token)
}

/**
 * 获取token
 */
export const getToken = () => {
  return localStorage.getItem(KEY)
}

/**
 * 删除token
 */
export const removeToken = () => {
  localStorage.removeItem(KEY)
}

/**
 * 判断是否登录了
 */
export const isAuth = () => {
  return getToken() ? true : false
}