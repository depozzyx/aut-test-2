import styled, { css } from 'styled-components'
import { useEffect } from 'react'
import { useUnmount } from 'react-use'
import { useScrollLock } from '@peiko/hooks/use-scroll-lock'
import { Loader } from '@peiko/components/loaders/Loader'

const Container = styled.div((props) => {
  const { zIndex, palette } = props.theme
  return css`
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${zIndex.high};
    background: ${palette.base};
  `
})

type TFullScreenLoaderProps = {
  /**
   * Option to lock scroll when loader is shown
   */
  fixScroll?: boolean
  /**
   * Custom loader. Valid amy React element.
   *
   * We already have default <Loader /> component, but you can pass your own.
   */
  loader?: React.ReactNode
}

export const FullScreenLoader: React.FC<TFullScreenLoaderProps> = ({
  fixScroll = true,
  loader,
}) => {
  const { stopScroll } = useScrollLock()

  useEffect(() => {
    if (!fixScroll) return
    setTimeout(() => {
      stopScroll(true)
    }, 0)
  }, [])

  useUnmount(() => {
    if (!fixScroll) return
    stopScroll(false)
  })

  return <Container>{loader || <Loader color="main2" size="m" />}</Container>
}
