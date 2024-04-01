import React from 'react'
import styled, { CSSProperties, css, createGlobalStyle } from 'styled-components'
import { TDefaultBreakpoints } from '@peiko/styles/types/breakpoints'
import { Sidebar } from '@/layout/common/Sidebar'
import { Header } from './common/Header'

type TProps = {
  minHeight?: CSSProperties['minHeight']
  maxWidth?: CSSProperties['maxWidth']
  padding?: CSSProperties['padding']
  justifyContent?: CSSProperties['justifyContent']
}

type TCabinetLayoutProps = TProps & Partial<TDefaultBreakpoints<TProps>>

const BodyColor = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.palette.base};
  }
`

export const ContentWrapper = styled.div<TCabinetLayoutProps>(
  (props) => css`
    display: flex;
    margin: 0 auto;
    background-color: ${props.theme.palette.base};
    min-height: ${props.minHeight || 'calc(100vh - var(--header-height))'};
    padding: ${props.padding ?? '0'};
    overflow-x: hidden;
    align-items: stretch;
    width: 100%;
    //align-items: center;
  `,
)

export const Content = styled.div<TCabinetLayoutProps>((props) => {
  const base = `
  display: flex;
  flex-direction: column;
  background-color: ${props.theme.palette.base};
  margin: 0 auto;
  width: 100%;
  max-width: ${props.maxWidth ?? '100%'};
  justify-content: ${props.justifyContent || 'flex-start'};
  padding: ${props.padding ?? '0'};
  height: 100%; 
`

  return css`
    ${base}
  `
})

export const CabinetLayout: React.FC<TCabinetLayoutProps> = ({ children, ...props }) => (
  <>
    <BodyColor />
    <Header />
    <ContentWrapper {...props}>
      <Sidebar />
      <Content padding="24px 26px 26px 40px" {...props}>
        {children}
      </Content>
    </ContentWrapper>
  </>
)
