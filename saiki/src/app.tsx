import { setup } from 'goober'
import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import { RenderNode } from './container/live/node'
import { NodeProps, NodePropsXXX } from './container/live/types'
// import { scriptUrl$ } from './stream/scriptUrl'

setup(h)

interface Props {
  config?: {
    node?: Record<string, NodePropsXXX>
    root?: string
  }
}
const reg = /^@(.*?):(.*?)$/

const hydrateNode = (node: NodePropsXXX, nodes: any): NodeProps | undefined => {
  switch (node.type) {
    case 'GRID': {
      return {
        ...node,
        content: Object.fromEntries(
          Object.entries(node.content)
            .map(x => [
              x[0],
              typeof x[1] === 'string' ? hydrateConfig(nodes, x[1]) : hydrateNode(x[1], nodes),
            ])
            .filter(x => !!x[1]),
        ) as Record<string, NodeProps>,
      }
    }
  }

  return node as any
}

const hydrateConfig = (node: Record<string, any>, root: string): NodeProps | undefined => {
  const m = root.match(reg)

  if (!m) return undefined

  switch (m[1]) {
    case 'N':
      if (!node[m[2]]) return undefined
      return hydrateNode(node[m[2]], node)
  }

  return undefined
}

export const App = ({ config: { node, root } = {} }: Props) => {
  const ccc = useMemo(() => (node && root ? hydrateConfig(node, root) : undefined), [node, root])

  console.log(JSON.stringify(ccc, null, 2))
  if (!ccc) return null

  return (
    <div>
      {/* <div>
        {scriptUrls?.map(u => (
          <script key={u} src={u} type="text/javascript" />
        ))}
      </div> */}
      <RenderNode {...ccc} />
    </div>
  )
}
