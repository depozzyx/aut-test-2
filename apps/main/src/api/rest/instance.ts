import axios, { AxiosInstance } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { ERROR_MESSAGE, ERROR_STATUS } from '@/constants/error-status'
import { API_REST_URL, AXIOS_TIMEOUT } from '@/constants/config'
import { isClient } from '@peiko/utils/is-сlient'
import { TStore } from '@/store'
import { errorActions } from '@/features/common/error'
import { userActions } from '@/features/common/user/store'

let store = {} as TStore

export const injectStore = (_store: TStore): void => {
  store = _store
}

const tz =
  typeof Intl !== 'undefined' &&
  Intl.DateTimeFormat &&
  Intl.DateTimeFormat().resolvedOptions().timeZone
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : undefined

const axiosBaseConfig = {
  baseURL: API_REST_URL,
  timeout: AXIOS_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    ...(tz ? { 'Time-Zone': tz } : {}),
  },
  withCredentials: true,
}

export const api: AxiosInstance = axios.create(axiosBaseConfig)

// refresh token
const refreshAuthLogic = async () => {
  const config = {
    ...axiosBaseConfig,
    headers: { ...axiosBaseConfig.headers },
  }

  return axios
    .post('/auth/refresh', {}, config)
    .then(() => Promise.resolve())
    .catch((e) => {
      if (!axios.isAxiosError(e) || !e.response) return
      store.dispatch(userActions.logoutAsync())
      return Promise.reject(e)
    })
}

// request middleware
api.interceptors.request.use((request) => request)

// response middleware
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response && error.message === ERROR_MESSAGE.NETWORK) {
      store.dispatch(errorActions.setNetworkError(true))
      return Promise.reject({})
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    if (!error.response) {
      return Promise.reject({})
    }

    const { status, data } = error.response
    const isAxiosError = axios.isAxiosError(error)

    if (isClient() && isAxiosError && status >= ERROR_STATUS.SERVER) {
      store.dispatch(errorActions.showGlobalError(data.message))
      return Promise.reject({})
    }

    return Promise.reject({
      ...error,
      response: { ...error.response, data: error.response.data },
    })
  },
)

createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [ERROR_STATUS.UNAUTHORIZED],
})
