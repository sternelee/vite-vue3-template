import client from '../utils/client';

export async function request (url: string, data = {}, option = {}) {
  url = option.env ? `${DY_API[option.env]}${url}` : `${DY_API[config.driveAPI]}${url}`

  const parsedData = await parseData(data, option)
  const {
    method,
    params
  } = parsedData

  // 每次请求前从客户端获取accessToken
  let accessToken
  try {
    if (client.isIOS()) {
      const [err, user] = await client.callNativeHandler('userInfo')
      accessToken = user.authorize
    } else if (client.isNative()) {
      accessToken = await client.ssoCallFunction('getAccessToken')
    } else {
      accessToken = await getStore().state.users.sso.accessToken
    }
    if (checkIsJSON(accessToken) && accessToken.includes('error')) throw new Error()
  } catch (error) {
    return Promise.reject('请重新登录')
  }

  const Authorization = 'Bearer ' + accessToken

  const headers = Object.assign({}, {
    'Authorization': Authorization
  }, option.headers)

  return axios({
    method,
    url,
    data,
    params,
    headers
  })
}