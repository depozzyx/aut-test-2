import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { DRAWER_PORTAL_ID } from '@peiko/constants/id'
import { FavIcon } from '@/html/FavIcon'
import { Fonts } from '@/html/Fonts'
import { InitStyleSheet } from '@/html/init-style-sheet'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return InitStyleSheet(ctx)
  }

  render() {
    return (
      <Html>
        <Head>
          <Fonts />
          <FavIcon />
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
