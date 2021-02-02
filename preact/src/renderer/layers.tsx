import { css } from 'goober'
import { useEffect, useState } from 'preact/hooks'
import { RenderNode } from './node'
import { LayersProps } from './types'

const useStyles = () => ({
  container: css({ position: 'relative' }),
  layer: css({ position: 'absolute' }),
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
          className={classes.layer}
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
