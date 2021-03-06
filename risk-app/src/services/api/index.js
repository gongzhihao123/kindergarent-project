import { request } from '@/services/request'
// import queryString from 'querystring'

export function apiLogin (param) {
  return request({
    url: '/authorize',
    method: 'post',
    data: param,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => e)
}

export function apiUserInfo (param) {
  return request({
    url: '/userInfo',
    method: 'get',
    data: param,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => e)
}

export function apiBack (param) {
  return request({
    url: '/bye',
    method: 'post',
    data: param,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => e)
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
    url: '/captcha',
    method: 'get',
    params: parameter,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 区域列表
export function apiAreaList (data) {
  return request({
    url: '/riskArea/page/' + data.current + '/' + data.pageSize,
    method: 'get',
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 上传文件
export function apiUploadFile (data) {
  return request.post('/riskLogAttachment/attachment', data)
    .then(res => res.data)
    .catch((e) => {})
}

// 删除上传文件
export function apiDelUploadFile (data) {
  return request.delete('/riskLogAttachment/attachment/' + data)
    .then(res => res.data)
    .catch((e) => {})
}

// 新增安全隐患 /risk
export function apiAddRisk (data) {
  return request({
    url: '/risk',
    method: 'post',
    data: data,
    isNeedLogin: true
  })
    .then(res => res)
    .catch((e) => {})
}

// 安全隐患列表
export function apiRiskPage (data) {
  return request.get('/risk/page/'+ data.current + '/' + data.pageSize + '?finishedFlag=' + data.finishedFlag + '&onlyMyselfFlag=' + data.onlyMyselfFlag)
    .then(res => res.data)
    .catch((e) => e)
}

// 安全隐患列表---隐患等级列表
export function apiDictDetail (data) {
  return request.get('/common/dictDetail', { params: data })
    .then(res => res.data)
    .catch((e) => e)
}

// 安全隐患列表---区域管理员
export function apiRiskList (data) {
  return request.get('/riskLog/risk/list')
    .then(res => res.data)
    .catch((e) => e)
}

// 安全隐患等级列表
export function apiRiskLevelList (data) {
  return request.get('/riskLevel/list')
    .then(res => res.data)
    .catch((e) => e)
}

// 维修人员列表
export function apiRepairUserList (data) {
  return request.get('/riskLog/repairUserList', { params: data })
    .then(res => res.data)
    .catch((e) => e)
}

// 安全隐患负责人确认---非本人提出
export function chargePersonConfirm (riskId, data) {
  return request.post('/riskLog/confirm/' + riskId, data)
    .then(res => res)
    .catch((e) => e)
}

// 安全隐患主任确认---非本人提出
export function zhuRenConfirm (riskId, data) {
  return request.post('/riskLog/check/' + riskId, data)
    .then(res => res)
    .catch((e) => e)
}

// 安全隐患维修人员确认---非本人提出
export function weiXiuConfirm (riskId, data) {
  return request.post('/riskLog/repair/' + riskId, data)
    .then(res => res)
    .catch((e) => e)
}

// 安全隐患负责人确认维修是否完成---非本人提出
export function areaAdminConfirm (riskId, data) {
  return request.post('/riskLog/finish/' + riskId, data)
    .then(res => res)
    .catch((e) => e)
}

// 安全隐患主任提交处理---管理员本人提出
export function zhuRenHandle (riskId, data) {
  return request.post('/riskLog/handle/' + riskId, data)
    .then(res => res)
    .catch((e) => {})
}

// 安全隐患主任提交处理
export function directorConfirm (riskId, data) {
  return request.post('/riskLog/confirmHandle/' + riskId, data)
    .then(res => res)
    .catch((e) => {})
}

// 安全隐患主任直接处理提交
export function directorHandle (riskId, data) {
  return request.post('/riskLog/confirmHandle/' + riskId, data)
    .then(res => res)
    .catch((e) => {})
}

// 查看提交记录
export function apiRiskLogList (data) {
  return request.get('/riskLog/list/' + data)
    .then(res => res.data)
    .catch((e) => {})
}
