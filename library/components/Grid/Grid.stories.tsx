/* eslint-disable i18next/no-literal-string */
import { StoryObj, Meta } from '@storybook/react'

import { Grid } from './Grid'

/**
 * Grid component is primarly used like in Material UI. [See info](https://mui.com/material-ui/react-grid/)
 *
 * You can use it as `container` for `item` Grid components
 *
 * You can use it as `item` inside `container` Grid component
 *
 * You can add responsivness to Grid `item` components by specifying breakpoint according to your theme
 *
 * For example: `<Grid item xs={12} />` means that on `xs` breakpoint Grid item will take 12 columns
 *
 * See props and examples below for better understanding
 */
const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
}

export default meta
type Story = StoryObj<typeof Grid>

/**
 * Basic Grid component
 */
export const Default: Story = {
  args: {
    spacing: 16,
    container: true,
    children: (
      <>
        <Grid item xs={12} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 12
        </Grid>
        <Grid item xs={6} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 6
        </Grid>
        <Grid item xs={6} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 6
        </Grid>
        <Grid item xs={9} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 9
        </Grid>
        <Grid item xs={3} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 3
        </Grid>
      </>
    ),
  },
}

/**
 * You can set spacing between items
 */
export const WithCustomSpacing: Story = {
  args: {
    spacing: 32,
    container: true,
    children: (
      <>
        <Grid item xs={6} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 6
        </Grid>
        <Grid item xs={6} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 6
        </Grid>
        <Grid item xs={6} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 6
        </Grid>
        <Grid item xs={6} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 6
        </Grid>
      </>
    ),
  },
}

/**
 * You can set number of columns for Grid container
 */
export const WithCustomColumns: Story = {
  args: {
    spacing: 16,
    columns: 24,
    container: true,
    children: (
      <>
        <Grid item xs={12} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 12
        </Grid>
        <Grid item xs={12} styles={{ backgroundColor: (theme) => theme.palette.base }}>
          Grid item 12
        </Grid>
      </>
    ),
  },
}

/**
 * You can adjust items width by breakpoints
 */
export const WithBreakPoints: Story = {
  args: {
    spacing: 16,
    container: true,
    children: (
      <>
        <Grid
          item
          xs={12}
          sm={6}
          styles={{ backgroundColor: (theme) => theme.palette.base }}
        >
          Grid item xs: 12, sm: 6
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          styles={{ backgroundColor: (theme) => theme.palette.base }}
        >
          Grid item xs: 12, sm: 6
        </Grid>
      </>
    ),
  },
}

/**
 * You can adjust styles for container and items
 */
export const WithCustomStyles: Story = {
  args: {
    spacing: 16,
    container: true,
    styles: {
      padding: '32px',
      backgroundColor: (theme) => theme.palette.base,
    },
    children: (
      <>
        <Grid
          item
          xs={12}
          lg={6}
          styles={{ backgroundColor: (theme) => theme.palette.main2 }}
        >
          Grid item xs: 12, lg: 6
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          styles={{ backgroundColor: (theme) => theme.palette.main2 }}
        >
          Grid item xs: 12, lg: 6
        </Grid>
      </>
    ),
  },
}
