import { useEffect, useRef } from 'preact/hooks'

export const NodeLayers = () => {
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
  )
}
