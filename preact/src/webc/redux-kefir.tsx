import { constant, Emitter, Event, fromEvents, fromPromise, Stream, stream } from 'kefir'
import register from 'preact-custom-element'
import { useEffect, useRef, useState } from 'preact/hooks'

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

class Subject<T, S = unknown> {
  private emitter?: Emitter<T, S>

  stream: Stream<T, S>

  constructor() {
    this.stream = stream<T, S>(_emitter => {
      this.emitter = _emitter
      return () => {
        this.emitter = undefined
      }
    })
  }

  emit(x: T): Subject<T, S> {
    this.emitter?.emit(x)
    return this
  }

  error(x: S): Subject<T, S> {
    this.emitter?.error(x)
    return this
  }

  end(): Subject<T, S> {
    this.emitter?.end()
    return this
  }

  emitEvent(x: Event<T, S>): Subject<T, S> {
    this.emitter?.emitEvent(x)
    return this
  }
}

const action$ = new Subject<Action>()
const DEFAULT_STATE: State = { value: 0 }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_VALUE': {
      const { diff } = action

      return {
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

const store$ = action$.stream.scan(reducer, DEFAULT_STATE)

const actionDispatcher = (func: any) => (...args: any) => action$.emit(func(...args))

const updateValue = actionDispatcher((diff: number) => ({
  diff,
  type: 'UPDATE_VALUE',
}))

const fetchUser = (u: string) =>
  constant(u)
    .debounce(1000)
    .filter(Boolean)
    .map(u => `https://api.github.com/users/${u}`)
    .flatMap(url =>
      fromPromise(fetch(url))
        .map(r => r.body)
        .take(1)
        .takeErrors(1)
        .onValue(user => action$.emit({ type: 'USER_FETCHED', user }))
        .onError(error => action$.emit({ type: 'USER_ERROR', error })),
    )

const App = () => {
  const refInput = useRef<HTMLInputElement>()

  useEffect(() => {
    const sub = fromEvents<{ target: HTMLInputElement }, unknown>(refInput.current, 'keyup')
      .flatMap(e => fetchUser(e.target.value))
      .observe()
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
    const sub = fromEvents(buttonPlus.current, 'click').observe(() => updateValue(1))
    return sub.unsubscribe
  }, [buttonPlus])

  useEffect(() => {
    const sub = fromEvents(buttonMinus.current, 'click').observe(() => updateValue(-1))
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
    const sub = store$.observe(v => setVal(v.value))
    return sub.unsubscribe
  }, [])

  return <span>{`Value: ${val}`}</span>
}

const Us = () => {
  const [val, setVal] = useState<User | undefined>(undefined)

  useEffect(() => {
    const sub = store$.observe(v => setVal(v.user))
    return sub.unsubscribe
  }, [])

  return (
    <div>
      <pre>{JSON.stringify(val, null, 2)}</pre>
    </div>
  )
}
register(App, 'keyweb-redux-kefir')
