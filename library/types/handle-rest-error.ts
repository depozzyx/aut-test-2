import { FormikHelpers } from 'formik'
import { Dispatch } from '@reduxjs/toolkit'

export type TResponse<M> = {
  statusCode: number
  message: M
  error?: string
}

export type TErrorProps<M> = {
  e: unknown
  dispatch: Dispatch
  custom?: (status: number, data: TResponse<M> | any) => boolean | void
  formik?: FormikHelpers<M>
}

const f = function handleRestError<M = string>(p: TErrorProps<M>): void {
  //
}

export type THandleRestError = typeof f
