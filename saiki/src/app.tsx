import { setup } from 'goober'
import { h } from 'preact'
import { Route, Switch } from 'wouter-preact'
import { HomePage } from './container/home'
import { NavBar } from './container/navbar'
import { useSubscription } from '../../kami/hook/subscription'
import { scriptUrl$ } from './stream/scriptUrl'

setup(h)

interface Props {
  config: {}
}

export const App = ({ config }: Props) => {
  const scriptUrls = useSubscription(scriptUrl$)

  if (!config) return null

  return (
    <div>
      <div>
        {scriptUrls?.map(u => (
          <script key={u} src={u} type="text/javascript" />
        ))}
      </div>

      <NavBar />

      <main>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <div>blah</div>
          </Route>
        </Switch>
      </main>
    </div>
  )
}
