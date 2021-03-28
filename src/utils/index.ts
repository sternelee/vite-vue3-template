
/**
 * 将一个支持callback的函数转换成支持promise的
 * @method promisefy
 * @param {Function} fn - 支持callback的函数
 * @param {Object} context - 执行环境
 * @returns {Function}
 */
 export function promisefy (fn, context) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const cb = (err, payload) => {
        if (err) {
          reject(err)
        } else {
          resolve(payload)
        }
      }
      fn.apply(context, [...args, cb])
    })
  }
}

/**
 * @method getQueryString
 * @desc 获取链接参数的值
 * @param url {String} - 链接地址
 * @param name {String} - 参数名称
 * @returns {String} - 参数值
 */
 export function getQueryString (url, name) {
  if (!url || !name) return
  return url.match(new RegExp(`(^${name}|[?|&]${name})=([^&#]+)`))
    ? RegExp.$2
    : ''
}

/**
 *
 * @param {Number} bytes 字节数
 * @param {Number} point 小数点保留的位置
 */
 export function bytesToSize (bytes, point = 1) {
  if (bytes === 0) {
    return '0 B'
  }
  const k = 1024 // or 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const val = bytes / Math.pow(k, i)
  let size = val.toPrecision(3)
  size = val.toFixed(point)
  return size + sizes[i]
}

export function formatTime (dateObj, fmt) {
  const o = {
    'M+': dateObj.getMonth() + 1, // 月份
    'd+': dateObj.getDate(), // 日
    'h+': dateObj.getHours(), // 小时
    'm+': dateObj.getMinutes(), // 分
    's+': dateObj.getSeconds(), // 秒
    'q+': Math.floor((dateObj.getMonth() + 3) / 3), // 季度
    S: dateObj.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

/** 节流函数 保证在mustRun毫秒内,必然触发一次 handler */
export function throttle (func, wait, mustRun) {
  let timeout
  let startTime = Date.now()
  return function () {
    const context = this
    const args = arguments
    const curTime = Date.now()
    clearTimeout(timeout)
    if (curTime - startTime >= mustRun) {
      func.apply(context, args)
      startTime = curTime
    } else {
      timeout = setTimeout(func, wait)
    }
  }
}

export const once = fn => {
  let called = false
  return function (...args) {
    if (called) return
    called = true
    return fn.apply(this, args)
  }
}

export function formatSize (size) {
  size = parseInt(size)
  if (!size) {
    return 0
  }
  const sizeMap = ['B', 'KB', 'M', 'G', 'T']
  let index = 0
  while (size > 1024) {
    size = size / 1024
    index++
  }
  size = String(size.toFixed(1))
  if (/(.0)/.test(size)) size = size.split('.0')[0]
  return `${size}${sizeMap[index]}`
}

/**
 *
 *
 * @export
 * @param {number} millisecond 持续时间 ms
 * @returns Promise<void>
 */
 export function sleep (millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, millisecond)
  })
}

export function checkValidLink (url) {
  return /^(thunder|magnet|http[s]?|ftp|ed2k):/i.test(url)
}