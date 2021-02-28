import { useEffect } from 'preact/hooks'
import { scriptUrl$ } from '../../stream/scriptUrl'
import { WebcProps } from './types'

export const NodeWebc = ({ name, url }: WebcProps) => {
  useEffect(() => {
    scriptUrl$.next([url])
  }, [url])

  const Tag = name

  return <Tag />
}
