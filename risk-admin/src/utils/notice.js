import { Message } from 'element-ui'

export function error (message) {
  Message.error({
    title: '错误',
    message
  })
}

export function success (message) {
  Message.success({
    message: message,
    type: 'success'
  })
}

export function warning (message) {
  Message.warning({
    title: '警告',
    message
  })
}
