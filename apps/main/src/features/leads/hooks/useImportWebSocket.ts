import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import debounce from 'lodash.debounce'
import { useRedux } from '@/hooks/use-redux'
import {
  selectFilesForImport,
  updateImportFileProgress,
} from '@/features/leads/store/leads'

export const useImportWebSocket = (): void => {
  const { dispatch, select } = useRedux()
  const files = select(selectFilesForImport)
  const socketRef = useRef<Socket>()

  const progressMapRef = useRef<Record<string, number>>({})

  const debouncedDispatch = useRef(
    debounce(() => {
      const map = progressMapRef.current
      Object.entries(map).forEach(([id, progress]) => {
        if (Number.isFinite(progress)) {
          dispatch(updateImportFileProgress({ id, importProgress: progress }))
        }
      })
      progressMapRef.current = {}
    }, 200),
  ).current

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_SOCKET_URL as string, {
      transports: ['websocket'],
    })

    socketRef.current.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
    })

    socketRef.current.on('import-progress', ({ fileId, progress }) => {
      progressMapRef.current[fileId] = progress
      debouncedDispatch()
    })

    return () => {
      socketRef.current?.disconnect()
      debouncedDispatch.cancel()
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
