import { NodeGrid } from './grid'
import { NodeLayers } from './layers'
import { NodeList } from './list'
import { NodeMarkdown } from './markdown'
import { NodeNav } from './nav'
import { NodeProps } from './types'
import { NodeWebc } from './webc'

export const Node = (props: NodeProps) => {
  switch (props.type) {
    case 'GRID':
      return <NodeGrid {...props} />
    case 'LAYERS':
      return <NodeLayers {...props} />
    case 'LIST':
      return <NodeList {...props} />
    case 'MD':
      return <NodeMarkdown {...props} />
    case 'NAV':
      return <NodeNav {...props} />
    case 'WEBC':
      return <NodeWebc {...props} />
    default:
      return (
        <>
          {props.childNodes.map(n => (
            <Node {...n} />
          ))}
        </>
      )
  }
}
