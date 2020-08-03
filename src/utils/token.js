/**
 * token相关操作
 */

const KEY = 'hkzf_token'

/**
 * 设置token
 * @param {*} token token
 */
export const setToken = token => {
  localStorage.setItem(KEY, JSON.stringify(token))
}

/**
 * 获取token
 */
export const getToken = () => {
  return JSON.parse(localStorage.getItem(KEY))
}
