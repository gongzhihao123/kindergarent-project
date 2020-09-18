/**
 *
 * @export
 * @param {any} time 输入需要转化的时间参数
 * @param {any} format 需要转化的格式
 * @returns 返回处理后的时间格式
 */
export function format (time, format) {
  if (!time) return null
  var date = new Date(time)
  var o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export function formatReplace (time) {
  if (!time) return null
  const format = time.replace('T', ' ')
  return format
}

/**
 *
 *  用于阿拉伯数字转换成对应的英文月单词
 *
 * @export
 * @param {Array} arr
 * @returns
 */
export function changeDateFormat (arr) {
  if (!arr) return
  // if(arr[5] === 'undefined' || arr[5] === NaN) {
  //   arr[5] === '0'
  // }
  const newString = arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4] + ':' + arr[5]
  return newString
}
