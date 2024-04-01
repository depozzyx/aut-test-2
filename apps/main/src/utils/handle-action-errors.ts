/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { FormikErrors, FormikHelpers } from 'formik'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { ERROR_STATUS } from '@/constants/error-status'
import { errorActions } from '@/features/common/error'
import { TRootState } from '@/store'

export type TResponse<M> = {
  message: string
  error?: string
  errors?: M
}

type THandleActionErrorProps<M> = {
  e: unknown
  dispatch: ThunkDispatch<TRootState, unknown, AnyAction>
  additionalConditions?: (status: number, data: TResponse<M>) => boolean | void
  formik?: FormikHelpers<any>
}

export function handleActionErrors<M = string>({
  e,
  dispatch,
  additionalConditions,
  formik,
}: THandleActionErrorProps<M>): void {
  if (formik) {
    formik.setSubmitting(false)
  }

  if (!axios.isAxiosError<TResponse<M | FormikErrors<any>>>(e) || !e.response) return

  const { status, data } = e.response

  if (axios.isCancel(e)) {
    return
  }

  if (formik && status === ERROR_STATUS.VALIDATION && typeof data.errors === 'object') {
    formik.setErrors(data.errors as any)
    return
  }

  if (additionalConditions) {
    const hasReturn = additionalConditions(status, data as TResponse<M>)
    if (hasReturn) return
  }

  dispatch(errorActions.showGlobalError(data.message as any))
}
