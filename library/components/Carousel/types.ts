import { CSSProperties } from 'styled-components'
import TSwiper, { SwiperOptions } from 'swiper'

type TCarouselOmit =
  | 'modules'
  | 'nested'
  | 'on'
  | 'scrollbar'
  | 'virtual'
  | 'resizeObserver'
  | 'setWrapperSize'
  | 'virtualTranslate'
  | 'focusableElements'
  | 'userAgent'
  | '_emitClasses'
  | 'loop'
  | 'width'

export type TCarouselProps = {
  children: React.ReactNode
  arrows?: boolean
  /**
   * The position of the arrows. It could be inside, on the edge, or outside the box.
   */
  arrowsPosition?: 'outside' | 'inside' | 'edge'
  /**
   * The position of the navigation. It could be inside or outside the box.
   */
  navigationPosition?: 'outside' | 'inside'
  /**
   * If loop is `true`, the carousel will automatically slide to the first slide after the last slide is reached.
   */
  loop?: boolean
  /**
   * Number of slides per view (slides visible at the same time on slider's container).
   * @note If you use it with "auto" value and along with `loop: true` then you need to specify `loopedSlides` parameter with amount of slides to loop (duplicate)
   * @note `slidesPerView: 'auto'` is currently not compatible with multirow mode, when `grid.rows` > 1
   *
   * @default 1
   */
  slidesPerView?: SwiperOptions['slidesPerView']
  /**
   * On change handler called with swiper instance as an argument.
   *
   */
  onChange?: (swiper: TSwiper) => void
  /**
   * On click handler
   *
   */
  onClickButton?: () => void
  /**
   * The width of the carousel in pixels number or string.
   * @default 100%
   */
  width?: CSSProperties['width']
  /**
   * If autoplay is `true`, the carousel will automatically slide to the next slide after the specified `autoplayDelay` time.
   * @default 100%
   */
  autoplay?: boolean
  /**
   * The delay of the autoplay in milliseconds.
   * @default 3000
   */
  autoplayDelay?: number
} & Omit<SwiperOptions, TCarouselOmit>
