import request from '@/utils/request'
// 获取区域列表
export function regionList (data) {
  return request({
    url: '/riskArea/page/' + data.pageNo + '/' + data.pageSize + '?keyword=' + data.keyword,
    method: 'get'
  })
}

// 添加区域
export function addRegion (data) {
  return request({
    url: '/riskArea',
    method: 'post',
    data
  })
}

// 删除区域
export function delRegion (areaId) {
  return request({
    url: '/riskArea/' + areaId,
    method: 'delete'
  })
}

// 添加区域管理员
export function addRegionAdmin (data) {
  return request({
    url: '/riskArea/admin',
    method: 'post',
    data
  })
}

// 区域管理员--人员列表
export function regionUserList () {
  return request({
    url: '/riskArea/userList',
    method: 'get'
  })
}

// 获取任务等级列表
export function riskLevelList (data) {
  return request({
    url: '/riskLevel/list',
    method: 'get'
  })
}

// 获取主任列表
export function riskLevelManageList (data) {
  return request({
    url: '/riskLevel/manager/list',
    method: 'get'
  })
}

// 添加任务等级
export function addRiskLevel (data) {
  return request({
    url: '/riskLevel',
    method: 'post',
    data
  })
}

// 编辑任务等级
export function editRiskLevel (data) {
  return request({
    url: '/riskLevel',
    method: 'put',
    data
  })
}

// 删除区域
export function delRiskLevel (data) {
  return request({
    url: '/riskLevel/' + data,
    method: 'delete'
  })
}
