import { Link, MatchRoute } from '@rturnq/solid-router'
import { Switch } from 'solid-js'
import { List } from './list'

export const Root = () => (
  <>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/widgets/1234">Widget #1234</Link>
    </nav>
    <main>
      <Switch fallback={<h1>404</h1>}>
        <MatchRoute end>
          <List />
        </MatchRoute>
        <MatchRoute path="about">
          <div>About</div>
        </MatchRoute>
      </Switch>
    </main>
  </>
)
