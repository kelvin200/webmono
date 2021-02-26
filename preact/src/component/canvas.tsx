import { useEffect, useRef } from 'preact/hooks'
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

// const useStyles = () => ({
//   container: css({ position: 'relative' }),
//   item: css({ position: 'absolute' }),
// })

export const NodeLayers = ({ childNodes }: LayersProps) => {
  // const classes = useStyles()
  // const [offset, setOffset] = useState(0)

  // useEffect(() => {
  //   const handleScroll = () => setOffset(window.pageYOffset)

  //   window.addEventListener('scroll', handleScroll)

  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])
  const refCanvas = useRef<HTMLCanvasElement>()

  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas.getContext) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.fillRect(10, 10, 50, 50)

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    ctx.fillRect(30, 30, 50, 50)

    ctx.fillRect(25, 25, 100, 100)
    ctx.clearRect(45, 45, 60, 60)
    ctx.strokeRect(50, 50, 50, 50)
  }, [])

  return (
    <canvas ref={refCanvas} width="1200" height="600">
      This is a fallback content
    </canvas>
    // <div className={classes.container}>
    //   {childNodes.map((node, i) => (
    //     <div
    //       className={classes.item}
    //       style={{
    //         transform: `translateY(${(offset * i) / 2}px)`,
    //       }}
    //     >
    //       <RenderNode {...node} />
    //     </div>
    //   ))}
    // </div>
  )
}
