import { TStyle } from '@peiko/styles'
import { Accept, DropzoneOptions } from 'react-dropzone'

export type TUploadFiles = {
  onDropAccepted: (file: File[]) => void
  className?: string
  accept?: Accept
  styles?: TStyle
} & Pick<DropzoneOptions, 'maxFiles' | 'maxSize' | 'disabled'>
