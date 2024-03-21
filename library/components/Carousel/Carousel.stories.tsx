/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import { Carousel } from './Carousel'

/**
 * Carousel component. You can use it to display a list of items in a horizontal scrollable container
 *
 * Use swiper react library
 *
 * [See docs](https://v8.swiperjs.com/react)
 */
const meta: Meta<typeof Carousel> = {
  title: 'Data display/Carousel',
  component: Carousel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof Carousel>

/**
 * Carousel component
 */
export const Default: Story = {
  args: {
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with autoplay function
 */
export const CarouselAutoplay: Story = {
  args: {
    autoplay: true,
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with autoplay delay
 * You can change the delay time in the controls panel with the "autoplayDelay" parameter in milliseconds
 */
export const CarouselAutoplayDelay: Story = {
  args: {
    autoplay: true,
    autoplayDelay: 1000,
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with speed
 * You can change the speed time in the controls panel with the "speed" parameter in milliseconds
 */
export const CarouselSpeed: Story = {
  args: {
    autoplay: true,
    speed: 1000,
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with space between slides
 * You can change the space between slides in the controls panel with the "spaceBetween" parameter in pixels
 */
export const CarouselWithCustomSpace: Story = {
  args: {
    spaceBetween: 32,
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with slides group
 * You can change the number of slides in the controls panel with the "slidesPerView" parameter
 */
export const CarouselWithGroup: Story = {
  args: {
    slidesPerView: 2,
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel without pagination
 * You can hide the pagination in the controls panel with the "pagination" parameter
 */
export const CarouselWithoutPagination: Story = {
  args: {
    pagination: false,
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with arrows
 */
export const CarouselWithArrows: Story = {
  args: {
    arrows: true,
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth padding={88}>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth padding={88}>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth padding={88}>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth padding={88}>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with outside arrows
 */
export const CarouselWithArrowsOutside: Story = {
  args: {
    arrows: true,
    arrowsPosition: 'outside',
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth padding={88}>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth padding={88}>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth padding={88}>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth padding={88}>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with inside navigation
 */
export const CarouselWithNavigationInside: Story = {
  args: {
    arrows: true,
    navigationPosition: 'inside',
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth padding={88}>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth padding={88}>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth padding={88}>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth padding={88}>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Infinite Carousel
 */
export const InfiniteCarousel: Story = {
  args: {
    arrows: true,
    loop: true,
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth padding={88}>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth padding={88}>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth padding={88}>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth padding={88}>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}

/**
 * Carousel with breakpoints
 * You can change the breakpoints in the controls panel with the "breakpoints" parameter
 */
export const WithBreakpoints: Story = {
  args: {
    arrows: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
    },
    width: '500px',
    children: [
      <Card key="slide-1" fullWidth padding={88}>
        <Text>Slide 1</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-2" fullWidth padding={88}>
        <Text>Slide 2</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-3" fullWidth padding={88}>
        <Text>Slide 3</Text>
        <Text>Slide content</Text>
      </Card>,
      <Card key="slide-4" fullWidth padding={88}>
        <Text>Slide 4</Text>
        <Text>Slide content</Text>
      </Card>,
    ],
  },
}
