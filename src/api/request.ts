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


async function parseData (options: IOptions): Promise<IParsedData> {
  const method: Method = options.method || 'GET'
  // if (process.env.TARO_ENV === 'h5') {
  let peerId: string = ''
  let guid: string = ''
  let userId: string = '0'
  let sessionId: string = ''
  if (config.runtimeEnv === 'shoulei') {
    const appMetaData: IAppMetaData = await getAppMetaData()
    const userInfo: IUser = await getUserInfo()
    if (appMetaData) {
      peerId = appMetaData.peerId
      guid = appMetaData.guid
    }
    if (userInfo) {
      userId = userInfo.userId as string
      sessionId = userInfo.userId as string
    }
  } else {
    peerId = getCookie('peerid') || getCookie('deviceid')
    userId = getCookie('userid')
    sessionId = getCookie('sessionid')
  }
  if (!guid) {
    guid = md5(peerId || random(32))
  }
  const userInfo: IUserInfo = {
    userId,
    sessionId,
    peerId,
    guid
  }
  return {
    method,
    userInfo
  }
}