import { RenderNode } from './node'
import { GridProps } from './types'

export const NodeGrid = ({ content, style }: GridProps) => (
  <>
    {Object.entries(content)
      .map(x => ({
        x: ~x[0].split(',')[0],
        y: ~x[0].split(',')[1],
        n: x[1],
      }))
      .sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x))
      .map(x => (
        <RenderNode {...x.n} />
      ))}
  </>
)
