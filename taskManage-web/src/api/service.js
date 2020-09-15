import axios from './axios'

// 登录
export function apiLogin (data) {
  return axios.post('/auth/authorize', data).then((res) => res.data)
}

// 验证
export function apiCodeImgUrl (data) {
  return axios.get('/auth/code', data).then((res) => res.data)
}

// 新增任务 /risk
export function apiAddWork (data) {
  return axios({
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
  return axios.get('/area/admin/userList')
    .then(res => res.data)
    .catch((e) => {})
}

// 任务列表
export function apiWorkList (data) {
  return axios.get('/work/list', { params: data })
    .then(res => res.data)
    .catch((e) => {})
}

// 删除上传文件
export function apiDelUploadFile (data) {
  return axios.delete('/workLogAttachment/attachment', { params: data })
    .then(res => res)
    .catch((e) => {})
}

// 工作处理
export function apiWorkHandle (workId, data) {
  return axios({
    url: '/workLog/handle/' + workId,
    method: 'post',
    data: data,
    isNeedLogin: true
  })
    .then(res => res)
    .catch((e) => {})
}

// 工作记录查看
export function apiWorkLog (data) {
  return axios.get('/workLog/list/' + data)
    .then(res => res.data)
    .catch((e) => {})
}
