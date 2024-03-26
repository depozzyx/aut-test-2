import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import { GlobalStyles } from '@/styled/global-styles'
import 'react-day-picker/dist/style.css'
import { useWindowHeight } from '@peiko/hooks/use-window-height'
import { InitUser } from '@/features/common/user/InitUser'
import { injectStore } from '@/api-rest/instance'
import { GlobalError, NetworkError } from '@/features/common/error'
import { StyledProvider } from '@peiko/styles'

injectStore(store)

const MyApp = ({ Component, pageProps }: AppProps) => {
  useWindowHeight()

  return (
    <Provider store={store}>
      <StyledProvider>
        <GlobalStyles />
        <GlobalError />
        <NetworkError />
        <InitUser />
        <Component {...pageProps} />
      </StyledProvider>
    </Provider>
  )
}

export default MyApp
