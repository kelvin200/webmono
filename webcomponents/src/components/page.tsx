import { NodeProps } from 'src/renderer/types'
import { RenderNode } from '../renderer/node'

const nodeconfig: NodeProps = {
  childNodes: [
    {
      type: 'WEBC',
      name: 'preact-sample-css',
      url: '/preact-text_s.js',
    },
  ],
}
export const Page = () => {
  return <RenderNode {...nodeconfig} />
}
