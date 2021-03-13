import register from 'preact-custom-element'
import { useEffect, useRef, useState } from 'preact/hooks'
import { BehaviorSubject, EMPTY, fromEvent, MonoTypeOperatorFunction, OperatorFunction } from 'rxjs'
import { ajax } from 'rxjs/internal/observable/dom/ajax'
import { catchError } from 'rxjs/internal/operators/catchError'
import { debounceTime } from 'rxjs/internal/operators/debounceTime'
import { filter } from 'rxjs/internal/operators/filter'
import { ignoreElements } from 'rxjs/internal/operators/ignoreElements'
import { map } from 'rxjs/internal/operators/map'
import { mergeMap } from 'rxjs/internal/operators/mergeMap'
import { pluck } from 'rxjs/internal/operators/pluck'
import { tap } from 'rxjs/internal/operators/tap'

const value$ = new BehaviorSubject<number>(0)
const updateValue = (diff: number) => value$.next(value$.getValue() + diff)

interface User {}
interface UserStore {
  user?: User
  error?: any
}

const userStore$ = new BehaviorSubject<UserStore>({})
const addUserToStore$: MonoTypeOperatorFunction<User> = tap(user => userStore$.next({ user }))
const addErrorToStore$ = (error: any) => {
  userStore$.next({ error })
  return EMPTY
}

const fetchUser$: OperatorFunction<string, never> = i$ =>
  i$.pipe(
    debounceTime(1000),
    filter(Boolean),
    map(u => `https://api.github.com/users/${u}`),
    mergeMap(url =>
      ajax(url).pipe(
        pluck('response'),
        addUserToStore$,
        catchError(addErrorToStore$),
        ignoreElements(),
      ),
    ),
  )

const App = () => {
  const refInput = useRef<HTMLInputElement>()

  useEffect(() => {
    const sub = fromEvent<{ target: HTMLInputElement }>(refInput.current, 'keyup')
      .pipe(
        map(e => e.target.value),
        fetchUser$,
      )
      .subscribe()
    return sub.unsubscribe
  }, [refInput])

  return (
    <div>
      <input ref={refInput} placeholder="GitHub username" />
      <Us />
      <Controller />
      <Value />
    </div>
  )
}
const Controller = () => {
  const buttonPlus = useRef<HTMLButtonElement>()
  const buttonMinus = useRef<HTMLButtonElement>()
  useEffect(() => {
    const sub = fromEvent(buttonPlus.current, 'click').subscribe(() => updateValue(1))
    return sub.unsubscribe
  }, [buttonPlus])
  useEffect(() => {
    const sub = fromEvent(buttonMinus.current, 'click').subscribe(() => updateValue(-1))
    return sub.unsubscribe
  }, [buttonMinus])
  return (
    <div>
      <button ref={buttonMinus}>-</button>
      <button ref={buttonPlus}>+</button>
    </div>
  )
}
const Value = () => {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const sub = value$.subscribe(v => setVal(v))
    return sub.unsubscribe
  }, [])
  return <span>{`Value: ${val}`}</span>
}

const Us = () => {
  const [val, setVal] = useState<User | undefined>(undefined)

  useEffect(() => {
    const sub = userStore$.subscribe(v => setVal(v.user))
    return sub.unsubscribe
  }, [])

  return (
    <div>
      <pre>{JSON.stringify(val, null, 2)}</pre>
    </div>
  )
}

register(App, 'keyweb-reactive-rxjs')
