import { withThemeFromJSXProvider } from '@storybook/addon-styling'
import type { Preview } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { theming } from '@peiko/styles/theme'
import 'react-day-picker/dist/style.css'
import { GlobalStyles } from "@/styles/global-styles"

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: theming.light,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }),
]

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#111E21',
        },
      ],
    },
  },
}

export default preview
