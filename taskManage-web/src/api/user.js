import request from './../uitls/request'

export default {
  apiLogin (data) {
    return request({
      url: '/auth/authorize',
      method: 'post',
      data
    })
      .then((res) => res.data)
      .catch(err => err)
  },
  // 验证
  apiCodeImgUrl () {
    return request({
      url: '/auth/code',
      method: 'get'
    })
      .then((res) => res.data)
  },
  getUserInfo () {
    return request({
      url: '/userInfo',
      method: 'get'
    })
  },
  // 新增任务 /risk
  apiAddWork (data) {
    return request({
      url: '/work',
      method: 'post',
      data: data
    })
      .then(res => res)
      .catch((e) => e)
  },

  // 人员列表
  apiUserlist () {
    return request.get('/area/admin/userList')
      .then(res => res.data)
      .catch((e) => {})
  },

  // 任务列表
  apiWorkList (data) {
    return request.get('/work/list', { params: data })
      .then(res => res.data)
      .catch((e) => e)
  },

  // 删除上传文件
  apiDelUploadFile (data) {
    return request.delete('/workLogAttachment/attachment', { params: data })
      .then(res => res)
      .catch((e) => e)
  },

  // 工作处理
  apiWorkHandle (workId, data) {
    return request({
      url: '/workLog/handle/' + workId,
      method: 'post',
      data: data,
      isNeedLogin: true
    })
      .then(res => res)
      .catch((e) => e)
  },

  // 工作记录查看
  apiWorkLog (data) {
    return request.get('/workLog/list/' + data)
      .then(res => res.data)
      .catch((e) => e)
  }
}
