import { setup } from 'goober'
import { h } from 'preact'
import { Link, LinkProps, Redirect, Route, Switch, useRoute } from 'wouter-preact'
import { Page2 } from './component'
import { useSubscription } from './hook/subscription'
import { scriptUrl$ } from './stream/scriptUrl'

setup(h)

const ActiveLink = (props: LinkProps) => {
  const [isActive] = useRoute(props.href || '')
  return (
    <Link {...props}>
      <a className={isActive ? 'active' : ''}>{props.children}</a>
    </Link>
  )
}

export const App = () => {
  const scriptUrls = useSubscription(scriptUrl$)
  return (
    <div>
      <div>
        {scriptUrls?.map(u => (
          <script key={u} src={u} type="text/javascript" />
        ))}
      </div>
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/about">What is Wouter</ActiveLink>
        <ActiveLink href="/faq">FAQ</ActiveLink>
        <ActiveLink href="/info">More Info (redirect)</ActiveLink>
      </nav>

      <main>
        <Switch>
          <Route path="/info">
            <Redirect to="/about" />
          </Route>
          <Route path="/">
            <Page2 />
          </Route>
          <Route path="/about">
            <div>blah</div>
          </Route>
          <Route path="/:anything*">
            <div>
              <b>404:</b> Sorry, this page isn't ready yet!
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  )
}
