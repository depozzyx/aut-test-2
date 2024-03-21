import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

type TInitStyleSheet = (ctx: DocumentContext) => Promise<{
  styles: JSX.Element
  html: string
  head?: (JSX.Element | null)[] | undefined
}>

export const InitStyleSheet: TInitStyleSheet = async (ctx) => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  try {
    // eslint-disable-next-line no-param-reassign
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    }
  } finally {
    sheet.seal()
  }
}
