import request from '@/utils/request'
// 获取区域列表
export function regionList (data) {
  return request({
    url: '/risk/area/page/' + data.pageNo + '/' + data.pageSize + '?keyword=' + data.keyword,
    method: 'get'
  })
}

// 添加区域
export function addRegion (data) {
  return request({
    url: '/risk/area',
    method: 'post',
    data
  })
}

// 删除区域
export function delRegion (areaId) {
  return request({
    url: '/risk/area/' + areaId,
    method: 'delete'
  })
}

// 获取区域管理员列表
export function regionAdminList (params) {
  return request({
    url: '/risk/area/admin/list',
    method: 'get',
    params
  })
}

// 添加区域管理员
export function addRegionAdmin (data) {
  return request({
    url: '/risk/area/admin',
    method: 'post',
    data
  })
}

// 删除区域管理员
export function delRegionAdmin (areaId, userId) {
  return request({
    url: '/risk/area/admin/' + areaId + '/' + userId,
    method: 'delete'
  })
}

// 区域管理员--人员列表
export function regionUserList () {
  return request({
    url: '/risk/area/userList',
    method: 'get'
  })
}
