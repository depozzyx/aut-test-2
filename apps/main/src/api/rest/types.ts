import { AxiosResponse } from 'axios'

export type TAxiosResponse<T> = Promise<AxiosResponse<T>>

export type TParams = { [key: string]: string | number | undefined }
