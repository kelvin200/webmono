import register from 'preact-custom-element'
import { useEffect, useRef, useState } from 'preact/hooks'
import { EMPTY, fromEvent, OperatorFunction, Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import {
  catchError,
  debounceTime,
  filter,
  ignoreElements,
  map,
  mergeMap,
  pluck,
  scan,
  tap,
} from 'rxjs/operators'

interface User {
  name: string
}

interface State {
  value: number
  user?: User
  userError?: Error
}

interface Action {
  type: string
  [key: string]: any
}

const action$ = new Subject<Action>()

const DEFAULT_STATE: State = { value: 0 }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_VALUE': {
      const { diff } = action

      return {
        ...state,
        value: state.value + diff,
      }
    }
    case 'USER_FETCHED': {
      const { user } = action

      return {
        ...state,
        user,
      }
    }
    case 'USER_ERROR': {
      const { error } = action

      return {
        ...state,
        userError: error,
      }
    }
    default:
      return state
  }
}

const store$ = action$.pipe(scan(reducer, DEFAULT_STATE))

const actionDispatcher = (func: any) => (...args: any) => action$.next(func(...args))

const updateValue = actionDispatcher((diff: number) => ({
  diff,
  type: 'UPDATE_VALUE',
}))

const fetchUser$: OperatorFunction<string, never> = i$ =>
  i$.pipe(
    debounceTime(1000),
    filter(Boolean),
    map(u => `https://api.github.com/users/${u}`),
    mergeMap(url =>
      ajax(url).pipe(
        pluck('response'),
        tap(user => action$.next({ type: 'USER_FETCHED', user })),
        catchError(error => {
          action$.next({ type: 'USER_ERROR', error })
          return EMPTY
        }),
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
    const sub = store$.subscribe(v => setVal(v.value))
    return sub.unsubscribe
  }, [])

  return <span>{`Value: ${val}`}</span>
}

const Us = () => {
  const [val, setVal] = useState<User | undefined>(undefined)

  useEffect(() => {
    const sub = store$.subscribe(v => setVal(v.user))
    return sub.unsubscribe
  }, [])

  return (
    <div>
      <pre>{JSON.stringify(val, null, 2)}</pre>
    </div>
  )
}

register(App, 'keyweb-redux-rxjs')
