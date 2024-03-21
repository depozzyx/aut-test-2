import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { DRAWER_PORTAL_ID } from '@peiko/constants/id'
import { Fonts } from '../src/html/Fonts'
import { InitStyleSheet } from '../src/html/init-style-sheet'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const styleSheet = await InitStyleSheet(ctx)
    return styleSheet
  }

  render() {
    return (
      <Html>
        <Head>
          <Fonts />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id={`${DRAWER_PORTAL_ID}`} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
