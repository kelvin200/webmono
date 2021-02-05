import { css } from 'goober'
import { RenderNode } from './node'
import { ListProps } from './types'

const useStyles = () => ({
  container: css({ display: 'flex' }),
  item: css({}),
})

export const NodeList = ({ childNodes, direction }: ListProps) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {childNodes.map(node => (
        <div className={classes.item} style={{ flexDirection: direction }}>
          <RenderNode {...node} />
        </div>
      ))}
    </div>
  )
}
