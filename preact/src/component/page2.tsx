import { NodeProps } from '../container/live/types'
import { RenderNode } from '../container/live/node'

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
