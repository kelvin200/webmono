export interface GridProps {
  type: 'GRID'
  childNodes: NodeProps[]
}

export interface ImageProps {
  type: 'IMG'
  url: string
}

type MovementDirection = 'N' | 'U' | 'D' | 'L' | 'R' | 'I' | 'O'
type DOMEvents = 'N' | 'C' | 'S'
interface MovementConfig {
  direction?: MovementDirection // Default: N
  speed?: number // Default: 1rem/s
  trigger?: DOMEvents // Default: N
  duration?: number // Default: 1s
}
interface OpacityConfig {}

type LayerConfig = NodeProps & {
  passiveMovements?: MovementConfig[]
  activeMovements?: MovementConfig[]
  opacity?: number | OpacityConfig
}

export interface LayersProps extends NodeBase {
  type: 'LAYERS'
  childNodes: LayerConfig[]
}
export interface MarkdownProps extends NodeBase {
  type: 'MD'
  content: string
}
export interface WebcProps extends NodeBase {
  type: 'WEBC'
  name: string
  url: string
}
export interface ListProps extends NodeBase {
  type: 'LIST'
  childNodes: NodeProps[]
  direction?: string
}
export interface NavProps extends NodeBase {
  type: 'NAV'
  childNodes: NodeProps[]
}
export interface NodeBase {
  type: unknown
  width?: number
  height?: number
}
export type NodeProps =
  | (NodeBase & {
      type?: never
      childNodes: NodeProps[]
    })
  | GridProps
  | LayersProps
  | MarkdownProps
  | WebcProps
  | ListProps
  | NavProps
  | ImageProps
