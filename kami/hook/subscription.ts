import { useEffect, useState } from 'preact/hooks'
import { Subject } from 'rxjs'

export const useSubscription = <T>(sub$: Subject<T>) => {
  const [state, setState] = useState<T | undefined>(undefined)

  useEffect(() => {
    const sub = sub$.subscribe(x => setState(x))

    return sub.unsubscribe
  }, [sub$])

  return state
}
