import request from '@/utils/request'

export function apiLogin (data) {
  return request({
    url: '/authorize',
    method: 'post',
    data
  })
}
// 验证
export function apiCodeImgUrl (token) {
  return request({
    url: '/captcha',
    method: 'get'
  })
}

export function getInfo (token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout () {
  return request({
    url: '/bye',
    method: 'post'
  })
}

// 字典列表
// 字典列表
export function dictList (current, size) {
  return request({
    url: '/manage/dict/page/' + current + '/' + size,
    method: 'get'
  })
}
// 添加字典
export function apiAddDict (data) {
  return request({
    url: '/manage/dict',
    method: 'post',
    data
  })
}
// 删除字典
export function apiDelDict (data) {
  return request({
    url: '/manage/dict/' + data,
    method: 'delete'
  })
}
// 修改字典
export function apiEditDict (data) {
  return request({
    url: '/manage/dict',
    method: 'put',
    data
  })
}

// 字典详情列表
// 字典列表
export function dictDetailList (dictId, current, size) {
  const params = {
    dictId
  }
  return request({
    url: '/manage/dictDetail/page/' + current + '/' + size,
    method: 'get',
    params
  })
}
// 添加字典
export function apiAddDictDetail (data) {
  return request({
    url: '/manage/dictDetail',
    method: 'post',
    data
  })
}
// 删除字典
export function apiDelDictDetail (data) {
  return request({
    url: '/manage/dictDetail/' + data,
    method: 'delete'
  })
}
// 修改字典
export function apiEditDictDetail (data) {
  return request({
    url: '/manage/dictDetail',
    method: 'put',
    data
  })
}

// 用户列表
// 用户列表
export function apiUserList (current, size) {
  return request({
    url: '/manage/userAccount/page/' + current + '/' + size,
    method: 'get'
  })
}
// 添加用户
export function apiAddUser (data) {
  return request({
    url: '/manage/userAccount',
    method: 'post',
    data
  })
}
// 删除用户
export function apiDelUser (data) {
  return request({
    url: '/manage/userAccount/' + data,
    method: 'delete'
  })
}

// 重置密码
export function apiResetPasseord (data) {
  return request({
    url: '/manage/userAccount/reset',
    method: 'put',
    data
  })
}
// 修改用户
export function apiEditUser (data) {
  return request({
    url: '/manage/userAccount',
    method: 'put',
    data
  })
}
// 修改用户信息
export function apiEditUserInfo (data) {
  return request({
    url: '/manage/userAccount/userInfo',
    method: 'post',
    data
  })
}

// 角色管理
// 角色权限列表
export function apiRolePermissionList () {
  return request({
    url: '/manage/role/permissionList',
    method: 'get'
  })
}
// 新增角色权限
export function apiAddRolePermission (data) {
  return request({
    url: '/manage/role/rolePermission ',
    method: 'post',
    data
  })
}
// 删除角色权限
export function apiDelRolePermission (data) {
  return request({
    url: '/manage/role/rolePermission/' + data.roleId + '/' + data.permissionId,
    method: 'delete'
  })
}
// 列表
export function apiRoleList (current, size) {
  return request({
    url: '/manage/role/page/' + current + '/' + size,
    method: 'get'
  })
}
// 添加
export function apiAddRole (data) {
  return request({
    url: '/manage/role',
    method: 'post',
    data
  })
}
// 删除
export function apiDelRole (data) {
  return request({
    url: '/manage/role/' + data,
    method: 'delete'
  })
}
// 修改
export function apiEditRole (data) {
  return request({
    url: '/manage/role',
    method: 'put',
    data
  })
}

// 权限管理
// 列表
export function apiPermissionList (current, size) {
  return request({
    url: '/manage/permission/page/' + current + '/' + size,
    method: 'get'
  })
}
// 添加
export function apiAddPermission (data) {
  return request({
    url: '/manage/permission',
    method: 'post',
    data
  })
}
// 删除
export function apiDelPermission (data) {
  return request({
    url: '/manage/permission/' + data,
    method: 'delete'
  })
}
// 修改
export function apiEditPermission (data) {
  return request({
    url: '/manage/permission',
    method: 'put',
    data
  })
}
