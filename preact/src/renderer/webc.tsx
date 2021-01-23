/// <reference path="../../types.d.ts" />

import Helmet from 'preact-helmet'
import { WebcProps } from './types'

export const NodeWebc = ({ name, url }: WebcProps) => {
  const Tag = name

  return (
    <>
      <Helmet script={[{ src: url, type: 'text/javascript' }]} />
      <Tag />
    </>
  )
}
