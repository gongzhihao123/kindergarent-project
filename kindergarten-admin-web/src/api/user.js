import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/auth/authorize',
    method: 'post',
    data
  })
}

export function getCodeImg () {
  return request({
    url: '/auth/code',
    method: 'get'
  })
}

// export function getInfo (token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout () {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 添加单位
export function addCompany (data) {
  return request({
    url: '/sys/company',
    method: 'post',
    data
  })
}

// 删除单位
export function delCompany (companyId) {
  return request({
    url: '​/sys/company' + companyId,
    method: 'delete'
  })
}

// 单位列表
export function companyList (data) {
  return request({
    url: '/sys/company/page/' + data.pageNo + '/' + data.pageSize + '?keyword=' + data.keyword,
    method: 'get'
  })
}

// 获取区域列表
export function regionList (data) {
  return request({
    url: '/area/list?keyword=' + data,
    method: 'get'
  })
}

// 添加区域
export function addRegion (data) {
  return request({
    url: '/area',
    method: 'post',
    data
  })
}

// 删除区域
export function delRegion (areaId) {
  return request({
    url: '/area/' + areaId,
    method: 'delete'
  })
}

// 获取区域管理员列表
export function regionAdminList (params) {
  return request({
    url: '/area/admin/list',
    method: 'get',
    params
  })
}

// 添加区域管理员
export function addRegionAdmin (data) {
  return request({
    url: '/area/admin',
    method: 'post',
    data
  })
}

// 删除区域管理员
export function delRegionAdmin (areaId) {
  return request({
    url: '/area/admin/' + areaId,
    method: 'delete'
  })
}

// 区域管理员--人员列表
export function regionUserList () {
  return request({
    url: '/area/admin/userList',
    method: 'get'
  })
}

// 获取用户列表
export function userList (data) {
  return request({
    url: '/sys/user/page/' + data.pageNo + '/' + data.pageSize,
    method: 'get'
  })
}

// 添加用户
export function addUser (data) {
  return request({
    url: '/area/admin',
    method: 'post',
    data
  })
}

// 删除用户
export function delUser (areaId) {
  return request({
    url: '/area/admin/' + areaId,
    method: 'delete'
  })
}

// 修改用户
export function editUser () {
  return request({
    url: '/area/admin/userList',
    method: 'get'
  })
}
