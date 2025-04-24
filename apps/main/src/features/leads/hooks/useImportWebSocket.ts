import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useRedux } from '@/hooks/use-redux'
import {
  selectFilesForImport,
  updateImportFileProgress,
} from '@/features/leads/store/leads'

export const useImportWebSocket = (): void => {
  const { dispatch, select } = useRedux()
  const files = select(selectFilesForImport)
  const socketRef = useRef<Socket>()

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_SOCKET_URL as string, {
      transports: ['websocket'],
    })

    socketRef.current.on('import-progress', ({ fileId, progress }) => {
      dispatch(updateImportFileProgress({ id: fileId, importProgress: progress }))
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    files.forEach((file) => {
      if (
        file.startImporting &&
        !file.imported &&
        !file.error &&
        !file.canceled &&
        !file.duplicate
      ) {
        socketRef.current?.emit('subscribe', { fileId: file.id })
      }
    })
  }, [files])
}
