import { AES as CryptoAES, enc } from 'crypto-js'

export const decrypt = (encrypted: string, secret: string): string =>
  CryptoAES.decrypt(encrypted, secret).toString(enc.Utf8)
