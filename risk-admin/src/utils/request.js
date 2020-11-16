import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
// import store from '@/store'
import { removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/json;charse=UTF-8'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
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
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    const status = error.response.status
    switch (status) {
      case 401:
        removeToken()
        router.push('/login')
        break
      case 403:
        removeToken()
        router.push('/login')
        break
    }
    return Promise.reject(error)
  }
)

export default service
