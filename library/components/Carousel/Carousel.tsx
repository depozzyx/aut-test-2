/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import TSwiper, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'
import { TCarouselProps } from './types'
import * as S from './Carousel.styled'
import { Navigation } from './components/Navigation'

import 'swiper/css/bundle'
import { SWIPER_CLASSES } from './constants'

const StyledSwiper = styled(Swiper)``

export const Carousel: React.FC<TCarouselProps> = ({
  arrows = false,
  arrowsPosition = 'inside',
  navigationPosition = 'outside',
  children,
  loop,
  slidesPerView = 1,
  width,
  speed = 300,
  spaceBetween = 16,
  autoplay,
  autoplayDelay = 3000,
  onChange,
  ...props
}) => {
  const { ...swiperProps } = props

  const [swiper, setSwiper] = useState<TSwiper | null>(null)

  const autoplayConfig = autoplay && {
    delay: autoplayDelay,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }

  const renderSlides = () =>
    React.Children.map(children, (child) => <SwiperSlide>{child}</SwiperSlide>)

  if (!children) {
    return null
  }

  return (
    <S.Wrapper width={width} navigationPosition={navigationPosition}>
      <S.Content>
        <StyledSwiper
          resizeObserver
          onSwiper={setSwiper}
          loop={loop}
          speed={speed}
          onSlideChange={onChange}
          modules={[Autoplay, Pagination]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          pagination={{
            clickable: true,
            el: `.${SWIPER_CLASSES.PAGINATION}`,
          }}
          autoplay={autoplayConfig}
          {...swiperProps}
        >
          {renderSlides()}
        </StyledSwiper>
        {arrows && (
          <Navigation loop={loop} swiper={swiper} arrowsPosition={arrowsPosition} />
        )}
        <div className={SWIPER_CLASSES.PAGINATION} />
      </S.Content>
    </S.Wrapper>
  )
}
