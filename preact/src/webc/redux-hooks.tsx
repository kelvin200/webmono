import { createContext } from 'preact'
import register from 'preact-custom-element'
import { useCallback, useContext, useReducer } from 'preact/hooks'

const App = () => {
  const [state, dispatch] = useReducer(RootReducer, DEFAULT_STATE)
  const store = { state, dispatch }

  return (
    <StoreContext.Provider value={store}>
      <Controller />
      <Value />
    </StoreContext.Provider>
  )
}

const Controller = () => {
  const store = useContext(StoreContext)
  const dispatch = store.dispatch

  const onPlusClick = useCallback(() => dispatch(updateValue(1)), [dispatch])
  const onMinusClick = useCallback(() => dispatch(updateValue(-1)), [dispatch])

  return (
    <div>
      <button onClick={onMinusClick}>-</button>
      <button onClick={onPlusClick}>+</button>
    </div>
  )
}

const Value = () => {
  const store = useContext(StoreContext)
  const value = store.state.value

  return <span>{`Value: ${value}`}</span>
}

interface State {
  value: number
}

export interface Action {
  type: string
  diff: number
}

const DEFAULT_STATE: State = { value: 0 }
const StoreContext = createContext({
  state: DEFAULT_STATE,
  dispatch: (action: Action) => {},
})

const RootReducer = (state: State, action: Action) => {
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

const updateValue = (diff: number): Action => ({
  diff,
  type: 'UPDATE_VALUE',
})

register(App, 'keyweb-redux-hooks')
