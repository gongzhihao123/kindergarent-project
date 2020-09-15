import axios from 'axios'
import * as publicPath from '../config'
// import querystring from 'querystring'
import router from '../router'
// import { getCookie } from '@/utils/cookie.js'
const service = axios.create({
  baseURL: publicPath.default,
  withCredentials: true,
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json;charse=UTF-8'
  }
})

// 拦截器
service.interceptors.request.use((config) => {
  let token = window.localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  if (
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete'
  ) {
    config.data = JSON.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  if (response.data.code === -2) {
    router.push('/homePage')
  }
  return response
}, error => {
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})

export default service
