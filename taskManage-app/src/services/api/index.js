import { request } from '@/services/request'
// import queryString from 'querystring'

export function apiLogin (param) {
  return request({
    url: '/auth/authorize',
    method: 'post',
    data: param,
    isNeedLogin: true
  })
    .then(res => res)
    .catch((e) => {})
}

// 注册
export function apiReg (data) {
  return request({
    url: '/api/login/wechatUser',
    method: 'post',
    data: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

export function apiCodeImgUrl (parameter) {
  return request({
    url: '/auth/code',
    method: 'get',
    params: parameter,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// // 区域列表
// export function apiAreaList (parameter) {
//   return request({
//     url: '/area/list',
//     method: 'get',
//     params: parameter,
//     isNeedLogin: true
//   })
//     .then(res => res.data)
//     .catch((e) => {})
// }


// 下载文件
// export function apiDwonUploadFile (data) {
//   return request.get('/workLogAttachment/attachment', { params: data })
//     .then(res => res.data)
//     .catch((e) => {})
// }

// 上传文件
export function apiUploadFile (data) {
  return request.post('/workLogAttachment/attachment', data)
    .then(res => res.data)
    .catch((e) => {})
}

// 删除上传文件
export function apiDelUploadFile (data) {
  return request.delete('/workLogAttachment/attachment', { params: data })
    .then(res => res)
    .catch((e) => {})
}

// 新增任务 /risk
export function apiAddWork (data) {
  return request({
    url: '/work',
    method: 'post',
    data: data,
    isNeedLogin: true
  })
    .then(res => res)
    .catch((e) => {})
}

// 人员列表
export function apiUserlist () {
  return request.get('/area/admin/userList')
    .then(res => res.data)
    .catch((e) => {})
}

// 任务列表
export function apiWorkList (data) {
  return request.get('/work/list', { params: data })
    .then(res => res.data)
    .catch((e) => {})
}

// 工作处理
export function apiWorkHandle (workId, data) {
  return request({
    url: '/workLog/handle/' + workId,
    method: 'post',
    data: data,
    isNeedLogin: true
  })
    .then(res => res)
    .catch((e) => e)
}

// 工作记录查看
export function apiWorkLog (data) {
  return request.get('/workLog/list/' + data)
    .then(res => res.data)
    .catch((e) => {})
}
