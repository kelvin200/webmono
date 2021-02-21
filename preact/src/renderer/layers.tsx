import { css } from 'goober'
import { useEffect, useState } from 'preact/hooks'
import { LayersProps } from './types'
import { RenderNode } from './node'

const useStyles = () => ({
  container: css({ position: 'relative' }),
  item: css({ position: 'absolute' }),
})

const example: LayersProps = {
  type: 'LAYERS',
  childNodes: [
    {
      passiveMovements: [
        {
          direction: 'L',
        },
      ],
      type: 'MD',
      content: '#background',
    },
    {
      passiveMovements: [
        {
          direction: 'R',
        },
      ],
      type: 'MD',
      content: '#foreground',
    },
  ],
}

export const NodeLayers = ({ childNodes }: LayersProps) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {childNodes.map(({ passiveMovements, ...node }, i) => (
        <div
          className={classes.item}
          style={{
            transform: `translateX(200px)`,
            animationDuration: 5000,
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
