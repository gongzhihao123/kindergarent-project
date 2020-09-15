// import cookies from 'js-cookie'

// 获取cookie
export function getCookie (key) {
  var arr = []
  var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return decodeURIComponent(arr[2])
  } else {
    return null
  }
}

// 设置cookie
export function setCookie (key, value, expiredays) {
  var expires = new Date()
  expires.setDate(expires.getDate() + expiredays)
  document.cookie =
    key +
    '=' +
    encodeURIComponent(value) +
    (expiredays ? ';expires=' + expires.toGMTString() : '')
}

// 删除cookie
export function delCookie (key) {
  var expires = new Date()
  expires.setTime(expires.getTime() - 1)
  var value = getCookie(key)
  if (value != null) {
    document.cookie = key + '=' + value + ';expires=' + expires.toGMTString()
  }
}
