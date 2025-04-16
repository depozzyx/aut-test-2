// axios timeout
export const AXIOS_TIMEOUT = 1000 * 30

// api
export const API_REST_URL = `${process.env.NEXT_PUBLIC_API_REST_URL}/`
export const API_SOCKET_URL = `${process.env.NEXT_PUBLIC_API_SOCKET_URL}/`
export const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY || ''

export const CLOUDFLARE_CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY

// Math
export const MAX_PRECISION = 80
