/**
 * 下载文件以及文件重命名
 * @param item 文件在数据库中存储信息
 * @param that this别名
 */
import { request } from '@/services/request'
export function downFile(item, that) {
  // xxx是后台接口， yyy是后台需要的数据
  // {responseType: 'blob'}必须添加，否则下载的文件会出现乱码
  return request.get('http://39.104.113.97/static/' + item.filepath,
  {
      responseType: 'blob'
  }).then(res =>{
      if (res.status === '0') {
          let types = ''
          // 判断文件类型，补充type
          if (item.file_type === 'xlsx' || item.file_type === 'xls') {
              types = 'application/vnd.ms-excel'
          } else if (item.file_type === 'doc') {
              types = 'application/x-doc'
          } else if (item.file_type === 'png') {
            types = 'application/x-png'
          } else if (item.file_type === 'jpg') {
              types = 'application/x-jpg'
          } else if (item.file_type === 'jpeg') {
              types = 'image/jpeg'
          }
          // res.data是后台返回的二进制数据，type:types为下载的数据类型
          const blob = new Blob([res.data], {
              type: types
          })
          const downLoadEle = document.createElement('a')
          const href = URL.createObjectURL(blob)
          downLoadEle.href = href
          // ooo为自定义文件名
          downLoadEle.download = item.filename
          document.body.appendChild(downLoadEle)
          downLoadEle.click()
          document.body.removeChild(downLoadEle)
          window.URL.revokeObjectURL(href)
      }
  })
}
