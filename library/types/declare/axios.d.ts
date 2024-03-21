import { AxiosError, AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosStatic {
    isAxiosError<T = never>(payload: unknown): payload is AxiosError<T>
  }
}

export type TAxiosResponse<T> = Promise<AxiosResponse<T>>

export {}
