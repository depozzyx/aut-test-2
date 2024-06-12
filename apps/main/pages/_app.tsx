import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import { GlobalStyles } from '@/styles/global-styles'
import 'react-day-picker/dist/style.css'
import { useWindowHeight } from '@peiko/hooks/use-window-height'
import { InitUser } from '@/features/common/user/InitUser'
import { injectStore } from '@/api-rest/instance'
import { GlobalError, NetworkError } from '@/features/common/error'
import { StyledProvider } from '@peiko/styles'
import { SocketError } from '@/features/common/error/SocketError'

injectStore(store)

const MyApp = ({ Component, pageProps }: AppProps) => {
  useWindowHeight()

  return (
    <Provider store={store}>
      <StyledProvider>
        <GlobalStyles />
        <GlobalError />
        <NetworkError />
        <SocketError />
        <InitUser />
        <Component {...pageProps} />
      </StyledProvider>
    </Provider>
  )
}

export default MyApp
