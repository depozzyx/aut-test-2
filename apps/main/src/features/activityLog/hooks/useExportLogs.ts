import { activityLogApi } from '@/api-rest/activity-logs'
import { TExportLogsReq } from '@/api-rest/activity-logs/types'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'
import b64toBlob from 'b64-to-blob'

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
      const {
        data: { data },
      } = await (fileType === 'csv'
        ? activityLogApi.exportCSV(params)
        : activityLogApi.exportPDF(params))

      const mimeType: { [key in TFileType]: string } = {
        csv: 'text/csv',
        pdf: 'application/pdf',
      }

      const blob = b64toBlob(data.data, mimeType[fileType])

      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = data.filename
      document.body.appendChild(a)
      a.click()

      document.body.removeChild(a)

      URL.revokeObjectURL(url)

      onSuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      formik.setSubmitting(false)
    }
  }
  return exportLogsAsync
}
