// 与安卓，IOS手雷客户端交互的api

import { sendMessage, isAndroid, isIOS } from './XLCLientCommon'

interface IParams {
  [key: string]: any
}

export default {
  // 安卓
  isNative: isAndroid && !!window.XLAccountJsBridge,
  callFunction (target: string, params: IParams = {}, args?: IParams & any) {
    return sendMessage({
      jsBridge: 'XLJSWebViewBridge',
      method: 'sendMessage',
      target,
      params,
      ...args
    })
  },
  // 用于云盘手雷内账号authorize获取，在webview中注入了账号的方法，可直接调用
  callHandler (target: string, params: IParams = {}) {
    return sendMessage({
      jsBridge: 'XLAccountJsBridge',
      method: 'callFunction',
      target,
      params,
      isJSON: false // 目前 getAccessToken 这个方法只返回字符串
    })
  },

  // 适合ios
  isIOS: isIOS && !!window.WebViewJavascriptBridge,
  callIosHandler (target: string, params: IParams = {}, args?: IParams & any) {
    return sendMessage({
      jsBridge: 'WebViewJavascriptBridge',
      method: 'callHandler',
      target,
      params,
      isCallBack: true,
      ...args
    })
  },
  clientToast (message = '未知错误，请稍后再试') {
    this.isNative && this.callFunction('xlShowToast', { message })
  }
}
