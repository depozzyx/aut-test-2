import React from 'react'
import styled, { CSSProperties, css, createGlobalStyle } from 'styled-components'
import { TDefaultBreakpoints } from '@peiko/styles/types/breakpoints'
import { Text } from '@peiko/components/Text'
import { Sidebar } from '@/layout/common/Sidebar'
import { Notification } from '@/features/common/notifications'
import { Flex } from '@/components/Flex'
import { Header } from './common/Header'

type TProps = {
  minHeight?: CSSProperties['minHeight']
  maxWidth?: CSSProperties['maxWidth']
  padding?: CSSProperties['padding']
  justifyContent?: CSSProperties['justifyContent']
  title?: string
  titlePaddingTop?: string
  breadCrumbs?: React.ReactNode
}

type TCabinetLayoutProps = TProps & Partial<TDefaultBreakpoints<TProps>>

const BodyColor = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.palette.base};
  }
`

const ContentWrapper = styled.div<TCabinetLayoutProps>(
  (props) => css`
    display: grid;
    grid-template-columns: 212px 1fr;
    margin: 0 auto;
    background-color: ${props.theme.palette.base};
    min-height: ${props.minHeight || 'calc(100vh - var(--header-height))'};
    padding: ${props.padding ?? '0'};
    overflow-x: hidden;
    align-items: stretch;
    width: 100%;
  `,
)

const Content = styled.div<TCabinetLayoutProps>((props) => {
  const base = `
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${props.justifyContent || 'flex-start'};
  width: 100%;
  min-width: 0;
  max-width: ${props.maxWidth ?? '100%'};
  min-height: calc(100vh - var(--header-height));
  margin: 0 auto;
  padding: ${props.padding ?? '0'};
  background-color: ${props.theme.palette.base2};
`

  return css`
    ${base}
  `
})

const CustomPopupOverlay = styled.div(
  ({ theme }) => css`
    position: absolute;
    inset: 0px;
    z-index: 1;
    display: none;
    width: 100%;
    min-height: calc(100vh - var(--header-height));
    background: ${theme.palette.overlay};
    pointer-events: none;
  `,
)

export const CabinetLayout: React.FC<TCabinetLayoutProps> = ({
  children,
  title,
  titlePaddingTop = '12px',
  breadCrumbs,
  ...props
}) => (
  <>
    <BodyColor />
    <Header />
    <ContentWrapper>
      <Sidebar />
      <Content padding="12px 26px 26px 26px" {...props}>
        {breadCrumbs && breadCrumbs}
        <CustomPopupOverlay id="customPopupOverlay" />
        <Flex align="center" justify="space-between">
          <Text variant="f2" styles={{ paddingTop: titlePaddingTop }}>
            {title}
          </Text>
          <Notification />
        </Flex>
        {children}
      </Content>
    </ContentWrapper>
  </>
)
