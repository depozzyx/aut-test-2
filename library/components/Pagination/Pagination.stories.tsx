import { StoryObj, Meta } from '@storybook/react'

import { useUpdateEffect } from 'react-use'
import { useState } from 'react'
import { Pagination as PaginationComponent } from './Pagination'
import { TPagination } from './types'

/** Pagination works in 3 modes `ssr`, with `onChange` callback and with `getLinkTo` function
 *
 * `SSR` mode render pagination as next links. In `SSR` mode when page changed `?page={currentPage}` will be added to url
 *
 * With `onChange` callback, pagination will render as set of buttons and become controlled component
 *
 * With `getLinkTo` function, pagination will render as links and will call `getLinkTo` function with `currentPage` as argument
 */
const meta: Meta<typeof PaginationComponent> = {
  title: 'Navigation/Pagination',
  component: PaginationComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  args: { size: 'm' },
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      defaultValue: 'm',
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj<typeof PaginationComponent>

const Pagination: React.FC<TPagination> = ({
  currentPage,
  lastPage = 5,
  onChange,
  ...props
}) => {
  const [page, setPage] = useState(1)

  useUpdateEffect(() => {
    if (!currentPage) return
    setPage(currentPage)
  }, [currentPage])

  const handleChange = (page: number) => {
    setPage(page)
    onChange?.(page)
  }

  return (
    <>
      <PaginationComponent
        currentPage={page}
        lastPage={lastPage}
        onChange={handleChange}
        {...props}
      />
    </>
  )
}

export const Client: Story = {
  render: ({ currentPage = 1, lastPage = 10, ...args }) => (
    <Pagination currentPage={currentPage} lastPage={lastPage} {...args} />
  ),
  argTypes: { onChange: { action: 'currentPage: ' } },
}

export const SSR: Story = {
  args: {
    ssr: true,
    lastPage: 5,
  },
}

export const WithCustomLink: Story = {
  args: {
    ssr: false,
    currentPage: 2,
    lastPage: 5,
    getLinkTo: (page) => `/page/${page}`,
  },
}

export const WithCustomLinkAndNextLinkProps: Story = {
  args: {
    ssr: false,
    currentPage: 2,
    lastPage: 5,
    nextLinkProps: { shallow: true },
    getLinkTo: (page) => `/page/${page}`,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    lastPage: 5,
  },
}

export const Mobile: Story = {
  render: ({ mobile = true, lastPage = 50, ...props }) => (
    <Pagination mobile={mobile} lastPage={lastPage} {...props} />
  ),
  argTypes: { onChange: { action: 'currentPage: ' } },
}

export const WithBreakpointSize: Story = {
  render: ({ mobile = true, lastPage = 50, ...props }) => (
    <Pagination
      mobile={mobile}
      lastPage={lastPage}
      size={{
        xs: 's',
        md: 'm',
        lg: 'l',
      }}
      {...props}
    />
  ),
  argTypes: { onChange: { action: 'currentPage: ' } },
}
