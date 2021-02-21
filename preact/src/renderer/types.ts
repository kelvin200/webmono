export interface GridProps {
  type: 'GRID'
  childNodes: NodeProps[]
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

export interface LayersProps {
  type: 'LAYERS'
  childNodes: LayerConfig[]
}
export interface MarkdownProps {
  type: 'MD'
  content: string
}
export interface WebcProps {
  type: 'WEBC'
  name: string
  url: string
}
export interface ListProps {
  type: 'LIST'
  childNodes: NodeProps[]
  direction?: string
}
export interface NavProps {
  type: 'NAV'
  childNodes: NodeProps[]
}
export type NodeProps =
  | {
      type?: never
      childNodes: NodeProps[]
    }
  | GridProps
  | LayersProps
  | MarkdownProps
  | WebcProps
  | ListProps
  | NavProps
