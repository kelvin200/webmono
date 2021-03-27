import { GridProps } from './types'

export const NodeGrid = ({ content, style }: GridProps) => (
  <div style={{ display: 'grid', ...style }}>
    {Object.entries(content)
      .map(x => ({
        x: ~~x[0].split(',')[0],
        y: ~~x[0].split(',')[1],
        n: x[1],
      }))
      .map(x => (
        <div
          style={{
            border: '2px solid #000',
            ...x.n.style,
          }}
        >{`${x.x}-${x.y}`}</div>
        // <RenderNode {...x.n} />
      ))}
  </div>
)
