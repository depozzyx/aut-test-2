import Head from 'next/head'
import * as Sentry from '@sentry/nextjs'
import { useState, useEffect } from 'react'

class SentryExampleFrontendError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'SentryExampleFrontendError'
  }
}

export default function Page(): React.ReactElement {
  const [hasSentError, setHasSentError] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const PAGE_TITLE = 'sentry-example-page'

  // Strings for i18n or lint compliance
  const DESCRIPTION_PART1 =
    'Click the button below, and view the sample error on the Sentry'
  const ISSUES_PAGE_TEXT = 'Issues Page'
  const DESCRIPTION_PART2 = '. For more details about setting up Sentry,'
  const DOCS_LINK_TEXT = 'read our docs'
  const DESCRIPTION_PART3 = '.'
  const THROW_SAMPLE_ERROR_TEXT = 'Throw Sample Error'
  const ERROR_SENT_TO_SENTRY_TEXT = 'Error sent to Sentry.'
  const CONNECTIVITY_ERROR_TEXT =
    'It looks like network requests to Sentry are being blocked, which will prevent errors from being captured. Try disabling your ad-blocker to complete the test.'

  useEffect(() => {
    async function checkConnectivity() {
      const result = await Sentry.diagnoseSdkConnectivity()
      setIsConnected(result !== 'sentry-unreachable')
    }
    checkConnectivity()
  }, [])

  return (
    <div>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>

      <main>
        <div className="flex-spacer" />
        {/* Example SVG icon, can be replaced or removed as needed */}
        <svg height="40" width="40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* SVG content here if needed */}
        </svg>
        <p className="description">
          {DESCRIPTION_PART1}{' '}
          <a
            target="_blank"
            href="https://sentry.teliqon.io/organizations/teliqon/issues/?project=13"
            rel="noreferrer"
          >
            {ISSUES_PAGE_TEXT}
          </a>
          {DESCRIPTION_PART2}{' '}
          <a
            target="_blank"
            href="https://docs.sentry.io/platforms/javascript/guides/nextjs/"
            rel="noreferrer"
          >
            {DOCS_LINK_TEXT}
          </a>
          {DESCRIPTION_PART3}
        </p>

        <button
          type="button"
          onClick={async () => {
            await Sentry.startSpan(
              {
                name: 'Example Frontend/Backend Span',
                op: 'test',
              },
              async () => {
                const res = await fetch('/api/sentry-example-api')
                if (!res.ok) {
                  setHasSentError(true)
                }
              },
            )
            throw new SentryExampleFrontendError(
              'This error is raised on the frontend of the example page.',
            )
          }}
          disabled={!isConnected}
        >
          <span>{THROW_SAMPLE_ERROR_TEXT}</span>
        </button>
        {hasSentError && <p className="success">{ERROR_SENT_TO_SENTRY_TEXT}</p>}
        {!hasSentError && !isConnected && (
          <div className="connectivity-error">
            <p>{CONNECTIVITY_ERROR_TEXT}</p>
          </div>
        )}
        {!hasSentError && isConnected && <div className="success_placeholder" />}

        <div className="flex-spacer" />
      </main>

      <style>{`
        main {
          display: flex;
          min-height: 100vh;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 16px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        }

        h1 {
          padding: 0px 4px;
          border-radius: 4px;
          background-color: rgba(24, 20, 35, 0.03);
          font-family: monospace;
          font-size: 20px;
          line-height: 1.2;
        }

        p {
          margin: 0;
          font-size: 20px;
        }

        a {
          color: #6341F0;
          text-decoration: underline;
          cursor: pointer;

          @media (prefers-color-scheme: dark) {
            color: #B3A1FF;
          }
        }

        button {
          border-radius: 8px;
          color: white;
          cursor: pointer;
          background-color: #553DB8;
          border: none;
          padding: 0;
          margin-top: 4px;

          & > span {
            display: inline-block;
            padding: 12px 16px;
            border-radius: inherit;
            font-size: 20px;
            font-weight: bold;
            line-height: 1;
            background-color: #7553FF;
            border: 1px solid #553DB8;
            transform: translateY(-4px);
          }

          &:hover > span {
            transform: translateY(-8px);
          }

          &:active > span {
            transform: translateY(0);
          }

          &:disabled {
	            cursor: not-allowed;
	            opacity: 0.6;
	
	            & > span {
	              transform: translateY(0);
	              border: none
	            }
	          }
        }

        .description {
          text-align: center;
          color: #6E6C75;
          max-width: 500px;
          line-height: 1.5;
          font-size: 20px;

          @media (prefers-color-scheme: dark) {
            color: #A49FB5;
          }
        }

        .flex-spacer {
          flex: 1;
        }

        .success {
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 20px;
          line-height: 1;
          background-color: #00F261;
          border: 1px solid #00BF4D;
          color: #181423;
        }

        .success_placeholder {
          height: 46px;
        }

        .connectivity-error {
          padding: 12px 16px;
          background-color: #E50045;
          border-radius: 8px;
          width: 500px;
          color: #FFFFFF;
          border: 1px solid #A80033;
          text-align: center;
          margin: 0;
        }
        
        .connectivity-error a {
          color: #FFFFFF;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
