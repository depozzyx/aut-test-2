import React from 'react'
import { ThemeProvider as Provider } from 'styled-components'
import { theming } from './theme'

export const StyledProvider: React.FC = ({ children }) => (
  <Provider theme={theming.light}>{children}</Provider>
)
