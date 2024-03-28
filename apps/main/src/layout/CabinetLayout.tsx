import React from 'react'
import styled, { CSSProperties, css, createGlobalStyle } from 'styled-components'
import { Header } from './common/Header'

type Props = {
  minHeight?: CSSProperties['minHeight']
  maxWidth?: CSSProperties['maxWidth']
  padding?: CSSProperties['padding']
  justifyContent?: CSSProperties['justifyContent']
}

type PageLayoutProps = Props & Partial<Props>

const BodyColor = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.palette.main};
  }
`

export const ContentWrapper = styled.div<PageLayoutProps>(
  (props) => css`
    display: flex;
    margin: 0 auto;
    background-color: ${props.theme.palette.base};
    min-height: ${props.minHeight || 'calc(100vh - var(--header-height))'};
    overflow-x: hidden;
    align-items: center;
    width: 100%;
  `,
)

export const Content = styled.div<PageLayoutProps>((props) => {
  const base = `
  display: flex;
  flex-direction: column;
  background-color: ${props.theme.palette.base};
  margin: 0 auto;
  width: 100%;
  max-width: ${props.maxWidth ?? '100%'};
  justify-content: ${props.justifyContent || 'flex-start'};
  padding: ${props.padding ?? '0'};
`

  return css`
    ${base}
  `
})

export const CabinetLayout: React.FC<PageLayoutProps> = ({ children, ...props }) => (
  <>
    <BodyColor />
    <Header />
    <ContentWrapper {...props}>
      <Content {...props}>{children}</Content>
    </ContentWrapper>
  </>
)
