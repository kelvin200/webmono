import { css } from 'goober'
import { useEffect, useState } from 'preact/hooks'
import { LayersProps } from './types'

type MovementDirection = 'U' | 'D' | 'L' | 'R' | 'I' | 'O'
type DOMEvents = 'N' | 'C' | 'S'
interface MovementConfig {
  direction: MovementDirection
  speed?: number // Default: 1rem/s
  trigger?: DOMEvents // Default: N
}
interface OpacityConfig {}

interface LayerConfig {
  movements?: MovementConfig[]
  opacity?: number | OpacityConfig
}

const useStyles = () => ({
  container: css({ position: 'relative' }),
  item: css({ position: 'absolute' }),
})

export const NodeLayers = ({ childNodes }: LayersProps) => {
  const classes = useStyles()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={classes.container}>
      {childNodes.map((node, i) => (
        <div
          className={classes.item}
          style={{
            transform: `translateY(${(offset * i) / 2}px)`,
          }}
        >
          <RenderNode {...node} />
        </div>
      ))}
    </div>
  )
}
