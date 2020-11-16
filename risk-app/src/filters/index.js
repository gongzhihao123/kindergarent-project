/**
 *
 *  用于阿拉伯数字转换成对应的英文月单词
 *
 * @export
 * @param {any} arr
 * @returns
 */
export function changeDateFormat (arr) {
  if (!arr) return
  if(arr[5] === 'undefined' || arr[5] === NaN) {
    arr[5] === '0'
  }
  let newString = arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4] + ':' + arr[5]
  return newString
}

export function formatReplace (time) {
  if (!time) return null
  let format = time.replace('T', ' ')
  return format
}