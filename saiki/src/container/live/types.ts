import { JSXInternal } from 'preact/src/jsx'

export interface GridProps extends NodeBase {
  type: 'GRID'
  content: NodeProps[]
}

export interface ImageProps extends NodeBase {
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
  style?: JSXInternal.CSSProperties
}

export interface LayersProps extends NodeBase {
  type: 'LAYERS'
  content: LayerConfig[]
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
  content: NodeProps[]
  direction?: string
}
export interface NavProps extends NodeBase {
  type: 'NAV'
  content: NodeProps[]
}
export interface NodeBase {
  type?: unknown
  style?: JSXInternal.CSSProperties
}
export type NodeProps =
  | (NodeBase & {
      type?: never
      direction?: 'row' | 'column'
      content: NodeProps[]
    })
  | GridProps
  | LayersProps
  | MarkdownProps
  | WebcProps
  | ListProps
  | NavProps
  | ImageProps
