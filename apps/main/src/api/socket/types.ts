export type TSubscribeProps<T> = {
  id: string
  callback: (data: T) => void
}

export type TDisconnectProps = {
  id: string
  callback: () => void
}

export type TReconnectProps = {
  id: string
  callback: () => void
}

export type TErrorProps = {
  id: string
  callback: () => void
}

export type TUnsubscribeProps = string

export type TEmitProps<T = unknown> = {
  action: string
  data: T
}

export type TExceptionError = {
  message: string | Record<string, string>
  error?: string
}

export type TSocketException = Array<string>
