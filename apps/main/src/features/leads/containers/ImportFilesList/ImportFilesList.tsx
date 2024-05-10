import { useRedux } from '@/hooks/use-redux'
import React, { FC } from 'react'
import { Flex } from '@/components/Flex'
import { deleteImportFile, selectFilesForImport } from '../../store/leads'
import { FileItem } from '../FileItem/FileItem'

export const ImportFilesList: FC = () => {
  const { select, dispatch } = useRedux()
  //   const { count } = useCounter(10, 5000)

  const files = select(selectFilesForImport)

  const onDelete = (id: string) => dispatch(deleteImportFile(id))

  return (
    <Flex direction="column" gap="8px" margin="0 0 24px">
      {files.map((file) => (
        <FileItem onDelete={onDelete} key={file.id} {...file} />
      ))}
    </Flex>
  )
}
