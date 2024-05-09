import { activityLogApi } from '@/api-rest/activity-logs'
import { TExportLogsReq } from '@/api-rest/activity-logs/types'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'

type TExportLogsArgs = {
  params: TExportLogsReq
  fileType: TFileType
  formik: TFormik
  onSuccess?: () => void
}

export type TFileType = 'pdf' | 'csv'

export const useExportLogs = (): ((args: TExportLogsArgs) => Promise<void>) => {
  const { dispatch } = useRedux()
  const exportLogsAsync = async ({
    params,
    fileType,
    formik,
    onSuccess,
  }: TExportLogsArgs) => {
    try {
      await (fileType === 'csv'
        ? activityLogApi.exportCSV(params)
        : activityLogApi.exportPDF(params))
      onSuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      formik.setSubmitting(false)
    }
  }
  return exportLogsAsync
}
