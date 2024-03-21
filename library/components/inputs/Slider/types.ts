import { CSSProperties } from 'styled-components'

// slider input
export type SliderValues = number[]

export type TSliderProps = {
  width?: CSSProperties['width']
  /**
   * Value makes the input controlled
   * @default undefined
   * @type number[]
   * */
  value?: SliderValues
  /**
   * The name of the slider input
   *
   * This property is mandatory for formik use cases and proper accessibility.
   * @required
   */
  name: string
  /**
   * The maximum allowed value of the slider. Should not be equal to min
   * */
  max: number
  /**
   * The minimum allowed value of the slider. Should not be equal to max.
   * */
  min: number
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.) The min prop serves as the origin for the valid values.
   * */
  step?: number
  /**
   * The default value of the slider.
   *
   * For single sliders, provide array with one value
   *
   * For ranged sliders, provide an array with two values
   *
   * By default uses min and max values
   * */
  defaultValues?: SliderValues
  /**
   * Callback function that is fired when the slider's value finally changed.
   *
   * This callback is called on mouseup or touchend events. So if the user drags the slider continuously, this callback will be called only once.
   *
   * @type (values: number[]) => void
   * */
  onChange?: (values: SliderValues) => void
}
