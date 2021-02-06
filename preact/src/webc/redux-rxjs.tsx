import register from 'preact-custom-element'
import { useEffect, useRef, useState } from 'preact/hooks'
import { fromEvent, Subject } from 'rxjs'
import { scan } from 'rxjs/operators'

interface State {
  value: number
}

interface Action {
  type: string
  diff: number
}

// create our stream as a subject so arbitrary data can be sent on the stream
const action$ = new Subject<Action>()

// Initial State
const DEFAULT_STATE: State = { value: 0 }

// Redux reducer
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

// Reduxification
const store$ = action$.pipe(scan(reducer, DEFAULT_STATE))

// Higher order function to send actions to the stream
const actionDispatcher = (func: any) => (...args: any) => action$.next(func(...args))

// Example action function
const updateValue = actionDispatcher((diff: number) => ({
  diff,
  type: 'UPDATE_VALUE',
}))

// React view component
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

register(App, 'keyweb-redux-rxjs')
