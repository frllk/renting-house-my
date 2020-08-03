/**
 * 封装axios请求
 */
import axios from 'axios'
import { getToken } from './token'

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
export default instance 