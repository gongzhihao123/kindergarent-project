import axios from 'axios'
import * as publicPath from '../config'
// import { notice } from './../utils/index'
// import querystring from 'querystring'
import router from '../router'
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
    // router.push('/homePage')
  }
  return response
}, error => {
  // if (error.response.status === 401) {
  //   window.location.replace('http://www.baidu.com')
  // }
  /** *** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        router.push('/login')
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        // window.location.href = '/NotFound'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
  }
  return Promise.reject(error)
})

export default service
