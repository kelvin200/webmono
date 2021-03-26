import { useEffect, useState } from 'preact/hooks'
import { Subject } from 'rxjs'

export const useSubscription = <T>(sub$: Subject<T>, stop?: boolean) => {
  const [state, setState] = useState<T | undefined>(undefined)

  useEffect(() => {
    if (stop) return

    const sub = sub$.subscribe(x => setState(x))

    return sub.unsubscribe
  }, [sub$, stop])

  return state
}
