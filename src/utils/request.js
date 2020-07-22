/**
 * 封装axios请求
 */
import axios from 'axios'

const instance = axios.create({
  baseUrl: process.REACT_APP_BASHURL,
  timeout: 6000
})
export default instance