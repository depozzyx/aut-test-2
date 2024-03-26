import React, { useMemo } from 'react'
import { ThemeProvider as Provider } from 'styled-components'
import { theming, TTheme } from './theme'

type TThemedSection = {
  theme: TTheme
}

export const ThemeProvider: React.FC<TThemedSection> = (props) => {
  const { children, theme } = props

  const themeConfig = useMemo(() => {
    if (theme === 'light') {
      return theming.light
    }
    return theming.dark
  }, [theme])

  return <Provider theme={themeConfig}>{children}</Provider>
}
