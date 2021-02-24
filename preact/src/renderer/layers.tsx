import { css, keyframes } from 'goober'
import { useEffect, useState } from 'preact/hooks'
import { LayersProps } from './types'
import { RenderNode } from './node'

const useStyles = () => ({
  container: css({
    position: 'relative',
    overflow: 'hidden',
  }),
  item: css({
    position: 'absolute',
  }),
})

const moveit = [
  keyframes`
  from, to {
    transform: translateX(-20%);
  }

  50% {
    transform: translateX(-10%);
  }
`,
  keyframes`
from, to {
  transform: translateX(0);
}

50% {
  transform: translateX(40%);
}
`,
]

export const NodeLayers = ({ childNodes, width, height }: LayersProps) => {
  const classes = useStyles()

  return (
    <div
      className={classes.container}
      style={{
        width: width || '100%',
        height: height || '100%',
      }}
    >
      {childNodes.map(({ passiveMovements, ...node }, i) => (
        <div
          className={classes.item}
          style={{
            animation: `${moveit[i]} 30s linear infinite`,
            bottom: 0,
          }}
        >
          <RenderNode {...node} />
        </div>
      ))}
    </div>
  )
}

// export const NodeLayers = ({ childNodes }: LayersProps) => {
//   const classes = useStyles()
//   const [offset, setOffset] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => setOffset(window.pageYOffset)

//     window.addEventListener('scroll', handleScroll)

//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <div className={classes.container}>
//       {childNodes.map(({ passiveMovements, ...node }, i) => (
//         <div
//           className={classes.item}
//           style={{
//             transform: `translateY(${(offset * i) / 2}px)`,
//           }}
//         >
//           <RenderNode {...node} />
//         </div>
//       ))}
//     </div>
//   )
// }
