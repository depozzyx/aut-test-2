import axios from 'axios'
import { ERROR_STATUS } from '@/constants/error-status'
import { TErrorProps, TResponse } from '@peiko/types/handle-rest-error'
import { errorActions } from '../store'

export function handleRestError<M = string>({
  e,
  dispatch,
  custom,
  formik,
}: TErrorProps<M>): void {
  if (formik) {
    formik.setSubmitting(false)
  }

  if (!axios.isAxiosError<TResponse<M | any>>(e) || !e.response) return

  const { status, data } = e.response

  if (axios.isCancel(e)) {
    return
  }

  if (custom) {
    const hasReturn = custom(status, data as TResponse<M>)
    if (hasReturn) return
  }

  if (formik && status === ERROR_STATUS.VALIDATION && typeof data.message === 'object') {
    formik.setErrors(data.message)
    return
  }

  dispatch(errorActions.showGlobalError(data.message as any))
}
