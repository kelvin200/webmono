import { createContext } from 'preact'

interface State {
  urls: string[]
}

export interface Action {
  type: string
  url: string
}

export const DEFAULT_STATE: State = { urls: [] }
export const StoreContext = createContext({
  state: DEFAULT_STATE,
  dispatch: (action: Action) => {},
})

export const RootReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_URL': {
      const { url } = action

      if (state.urls.includes(url)) return state

      return {
        urls: state.urls.concat(url),
      }
    }
    default:
      return state
  }
}

export const addUrl = (url: string) => ({
  url,
  type: 'ADD_URL',
})
