// axios timeout
export const AXIOS_TIMEOUT = 1000 * 30

// api
export const API_REST_URL = `${process.env.NEXT_PUBLIC_API_REST_URL}/`
export const API_SOCKET_URL = `${process.env.NEXT_PUBLIC_API_SOCKET_URL}/`
export const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY || ''

export const CLOUDFLARE_CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY

export const { NEXT_PUBLIC_SUPPORT_EMAIL_CONTACT } = process.env

// Math
export const MAX_PRECISION = 80

const iceServersUrls = (process.env.NEXT_PUBLIC_SIP_COTURN_URL ?? '').split(',')
const iceServersUsernames = (process.env.NEXT_PUBLIC_SIP_COTURN_USER ?? '').split(',')
const iceServersCredentials = (process.env.NEXT_PUBLIC_SIP_COTURN_PASSWORD ?? '').split(
  ',',
)
export const ICE_SERVERS = iceServersUrls.map((url: string, index: number) => ({
  urls: url,
  username: iceServersUsernames?.[index],
  credential: iceServersCredentials?.[index],
}))
