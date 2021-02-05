export interface GridProps {
  type: 'GRID'
  childNodes: NodeProps[]
}
export interface LayersProps {
  type: 'LAYERS'
  childNodes: NodeProps[]
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
