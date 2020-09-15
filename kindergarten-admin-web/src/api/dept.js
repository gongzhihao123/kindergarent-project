import request from '@/utils/request'

// 添加部门
export function addDept (data) {
  return request({
    url: '/sys/dept',
    method: 'post',
    data
  })
}

// 获取部门
export function deptList (params) {
  return request({
    url: '/sys/dept/list',
    method: 'get',
    params
  })
}

// 修改部门
export function editDept (data) {
  return request({
    url: '​/sys/dept',
    method: 'put',
    data
  })
}

// 删除部门
export function delDept (deptId) {
  return request({
    url: '/sys/dept/' + deptId,
    method: 'delete'
  })
}

export default { deptList, addDept, editDept, delDept }
