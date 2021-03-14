import { NodeGrid } from './grid'
import { NodeImage } from './image'
import { NodeLayers } from './layers'
import { NodeList } from './list'
import { NodeMarkdown } from './markdown'
import { NodeNav } from './nav'
import { NodeProps } from './types'
import { NodeWebc } from './webc'

export const RenderNode = (props: NodeProps) => {
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
    case 'IMG':
      return <NodeImage {...props} />
    default:
      return (
        <>
          {props.content.map(n => (
            <RenderNode {...n} />
          ))}
        </>
      )
  }
}
