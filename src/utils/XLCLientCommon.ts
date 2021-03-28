const ua = navigator.userAgent
const UA_IOS_REG = /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/
const isIOS13Pad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1

const UA_ANDROID_REG = /\bAndroid([^;]+)/
const UA_WX_REG = /MicroMessenger/
const UA_WEIBO_REG = /\bWeibo/
const UA_QZONE_REG = /Qzone\//

export const isAndroid = UA_ANDROID_REG.test(ua)
export const isWeibo = UA_WEIBO_REG.test(ua)
export const isQzone = UA_QZONE_REG.test(ua)
export const isWx = UA_WX_REG.test(ua)
export const isIOS = UA_IOS_REG.test(ua) || isIOS13Pad

const callbacks: any = window.G2_callbacks = {
  _id: 0,
  _getId: function () {
    return this._id++
  }
}

interface IMessage {
  jsBridge: string
  method: string
  target: string
  params: {
    [key: string]: any
  }
  callbackTimeout?: number
  isCallBack?: boolean
  isJSON?: boolean
}

export function sendMessage ({ jsBridge, method, target, params, isCallBack = false, callbackTimeout = 5000, isJSON = true }: IMessage) {
  if (!window[jsBridge]) {
    return Promise.reject('不在客户端环境内')
  }
  const clientPromise = new Promise((resolve, reject) => {
    // 默认以全局callback的形式进行回调
    if (isCallBack) {
      window[jsBridge][method](target, params, (...args: any) => {
        resolve(args)
      })
    } else {
      let callbackName: string
      const callbackKey = '_callback_' + callbacks._getId() + '_' + target
      callbacks[callbackKey] = function (args: any) {
        callbacks[callbackKey] = null
        window[callbackName] = null
        const data = args && isJSON ? JSON.parse(args) : args
        resolve(data)
      }
      callbackName = 'window.G2_callbacks.' + callbackKey
      console.log(target, params)
      window[jsBridge][method](target, JSON.stringify(params), callbackName)
    }
  })
  return Promise.race([
    clientPromise,
    promiseTimeOut(callbackTimeout, `${target}-客户端通信超时`)
  ])
}

function promiseTimeOut (time: number, reason = '') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(reason)
    }, time)
  })
}
