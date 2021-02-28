import { JSXInternal } from 'preact/src/jsx'

interface ListProps<T extends {} = {}> {
  itemComponent: (props: T) => JSXInternal.Element
  itemsContent: T[]
}
export function List<T>({ itemComponent, itemsContent }: ListProps<T>) {
  return <>{itemsContent.map(i => itemComponent(i))}</>
}
