import { useDropzone } from 'react-dropzone'
import React, { FC } from 'react'
import { Wrapper } from './UploadFiles.styled'
import { TUploadFiles } from './types'

export const UploadFiles: FC<TUploadFiles> = ({
  className,
  onDropAccepted,
  children,
  accept = {
    'text/csv': ['.csv'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  },
  styles,
  disabled,
  maxFiles,
  maxSize,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDropAccepted,
    disabled,
    maxFiles,
    maxSize,
  })

  return (
    <Wrapper
      disabled={disabled}
      styles={styles}
      className={className}
      {...getRootProps()}
    >
      <input type="file" {...getInputProps()} />
      {children}
    </Wrapper>
  )
}
