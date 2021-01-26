import { useContext, useEffect } from 'preact/hooks'
import { addUrl, StoreContext } from '../store'
import { WebcProps } from './types'

export const NodeWebc = ({ name, url }: WebcProps) => {
  const store = useContext(StoreContext)
  const dispatch = store.dispatch

  useEffect(() => {
    dispatch(addUrl(url))
  }, [dispatch, url])

  const Tag = name

  return <Tag />
}
