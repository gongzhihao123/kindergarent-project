import axios from 'axios'
import config from '../config/index'
import route from '../router/index'

const service = axios.create({
  baseURL: config.baseURL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charse=UTF-8'
  }
})

service.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
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

service.interceptors.response.use(
  response => {
    const res = response
    return res
  },
  error => {
    switch (error.response.status) {
      case 401:
        route.push('/login')
        window.localStorage.removeItem('token')
        // location.reload()
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default service
