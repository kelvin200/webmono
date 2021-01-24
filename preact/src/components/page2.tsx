import { NodeProps } from 'src/renderer/types'
import { RenderNode } from '../renderer/node'

const nodeconfig: NodeProps = {
  childNodes: [
    {
      type: 'WEBC',
      name: 'preact-sample-blah',
      url: '/preact-text_s2.js',
    },
  ],
}
export const Page2 = () => {
  return <RenderNode {...nodeconfig} />
}
