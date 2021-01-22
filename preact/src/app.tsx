import { setup } from 'goober'
import { h } from 'preact'
import { Page } from './components'

setup(h)

export const App = () => {
  return (
    <div>
      <Page />
    </div>
  )
}
