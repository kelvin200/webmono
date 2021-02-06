import { Emitter, Event, fromEvents, Stream, stream } from 'kefir'
import register from 'preact-custom-element'
import { useEffect, useRef, useState } from 'preact/hooks'

interface State {
  value: number
}

interface Action {
  type: string
  diff: number
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

const reducer = (state: State = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    case 'UPDATE_VALUE': {
      const { diff } = action

      return {
        value: state.value + diff,
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

const App = () => {
  return (
    <div>
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

register(App, 'keyweb-redux-kefir')
