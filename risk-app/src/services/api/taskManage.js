import { request } from '@/services/request'


// 上传文件
export function apiUploadFile (data) {
  return request.post('/workLogAttachment/attachment', data)
    .then(res => res.data)
    .catch((e) => {})
}

// 删除上传文件
export function apiDelUploadFile (data) {
  return request.delete('/workLogAttachment/attachment/' + data)
    .then(res => res.data)
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
  return request.get('/workLog/userList')
    .then(res => res.data)
    .catch((e) => {})
}

// 任务列表
export function apiWorkList (data) {
  return request.get('/work/page/' + data.current + '/' + data.size + '?type=' + data.type,)
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
    .then(res => res.data)
    .catch((e) => e)
}

// 工作记录查看
export function apiWorkLog (data) {
  return request.get('/workLog/list/' + data)
    .then(res => res.data)
    .catch((e) => {})
}
