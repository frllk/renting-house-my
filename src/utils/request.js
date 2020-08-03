/**
 * 封装axios请求
 */
import axios from 'axios'
import { getToken, removeToken } from './token'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASHURL,
  timeout: 6000
})

// 设置axios请求拦截器 ==== 在 request 拦截器实现
instance.interceptors.request.use(
  config => {
    const token = getToken()
    if (token)
      config.headers.authorization = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.data.status === 400) {
      removeToken()
    }
    return response
  },
  err => {
    return Promise.reject(err)
  }
)
export default instance 