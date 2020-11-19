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
