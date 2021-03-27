let _localCounter = 1 // 同一个方法名快速请求时，可能 Date.now() 还没有变化

export function fetchClientRes (method: string, arg?: any): Promise<any> {
  return new Promise((resolve) => {
    if (window.XLJSWebViewBridge && typeof window.XLJSWebViewBridge.sendMessage === 'function') {
      let callbackName = `${method}CallbackName${Date.now()}`
      if (window[callbackName]) {
        _localCounter += 1
        callbackName = `${method}CallbackName${Date.now()}_${_localCounter}`
      }

      window[callbackName] = (res: any) => {
        try {
          const data = JSON.parse(res)
          resolve(data)
        } catch (e) {
          resolve(res)
        }
        window[callbackName] = null
      }

      window.XLJSWebViewBridge.sendMessage(
        method,
        JSON.stringify(arg || {}),
        callbackName
      )

      if (import.meta.env.MODE === 'development') { console.log('window.XLJSWebViewBridge.sendMessage：', method, arg, callbackName) }
    } else {
      resolve({})
    }
  })
}
