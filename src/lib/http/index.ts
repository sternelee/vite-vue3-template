import { IAppMetaData, IUser } from 'src/types/user'
import { fetchClientRes } from 'src/lib/client'
import { getCookie, random } from 'src/utils'
import { getAppMetaData, getUserInfo } from 'src/lib/account'
import config from '../../../config'

type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

interface IParams {
  [key: string]: any
}

interface IHeader {
  [key: string]: string
}

interface IUserInfo {
  userId: string | number,
  sessionId?: string | number,
  guid: string,
  peerId: string
}

interface IParsedData {
  method: Method,
  userInfo: IUserInfo
}

interface IOptions {
  method?: Method,
  headers?: IHeader,

  [key: string]: any
}

export async function fetchRes (url: string, params: IParams = {}, options: IOptions = {}): Promise<any> {
  const parsedData: IParsedData = await parseData(options)
  const method: Method = parsedData.method
  if (method === 'GET') {
    url = joinParams(url, params)
  }
  if (import.meta.env.MODE === 'development') { console.log(config.runtimeEnv) }

  if (config.runtimeEnv === 'shoulei') {
    if (!url.match(/\/\//)) {
      url = (config.apiEnv === 'prod' ? 'https://api-shoulei-ssl.xunlei.com' : 'http://test.api-shoulei-ssl.xunlei.com') + url
    }
    return fetchClientRes('xlHttpRequestForward', {
      url,
      method: parsedData.method,
      postContent: method === 'GET' ? undefined : params,
      withClientHeader: true

    })
      .then(res => {
        try {
          return JSON.parse(res.responseText)
        } catch (e) {
          return { _errorMessage: res.errorMessage || '请求错误' }
        }
      })
    // 所有情况最终都返回完成的Promise
  }
  return fetch({
    ...options,
    method: parsedData.method,
    url,
    data: method === 'GET' ? undefined : JSON.stringify(params)
  })
  // 若有客户端返回，则返回完成Promise，参数：{data：开发者服务器返回的数据, statusCode: 开发者服务器返回的 HTTP 状态码, header: 开发者服务器返回的 HTTP Response Header }
  // 若各种原因导致客户端没有返回，则返回失败Promise，参数：Error类型（message是错误信息）
    .then((res) => res.data)
    .catch((res) => ({ _errorMessage: res.message || '请求错误' }))
  // 所有情况最终都返回完成的Promise
}

function joinParams (url: string, params: IParams) {
  if (!/\?/.test(url)) {
    url += '?'
  }
  const keyValues = Object.keys(params || {}).map(key => {
    return `${key}=${params[key]}`
  })
  return url + keyValues.join('&')
}
