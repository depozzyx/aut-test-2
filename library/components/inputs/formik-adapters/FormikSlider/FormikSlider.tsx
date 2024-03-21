import React from 'react'
import { TFormik } from '@peiko/types/formik'
import { SliderValues, TSliderProps } from '../../Slider/types'
import { Slider } from '../../Slider'

type TProps = {
  formik: TFormik
} & TSliderProps

export const FormikSlider: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const field = formik.getFieldProps(props.name)
  const handleChange = (values: SliderValues) => {
    formik.setFieldValue(field.name, values)

    if (onChange) {
      onChange(values)
    }
  }

  return <Slider {...props} {...field} onChange={handleChange} />
}
