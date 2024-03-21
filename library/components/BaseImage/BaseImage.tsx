import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

type TBaseImage = ImageProps

export const BaseImage: FC<TBaseImage> = (props) => {
  const { src } = props

  return <>{src && <Image {...props} src={src} />}</>
}
