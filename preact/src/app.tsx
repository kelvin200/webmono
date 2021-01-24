import { setup } from 'goober'
import { h } from 'preact'
import { Link, LinkProps, Redirect, Route, Switch, useRoute } from 'wouter-preact'
import { Page, Page2 } from './components'

setup(h)

const ActiveLink = (props: LinkProps) => {
  const [isActive] = useRoute(props.href || '')
  return (
    <Link {...props}>
      <a className={isActive ? 'active' : ''}>{props.children}</a>
    </Link>
  )
}

export const App = () => (
  <div className="App">
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
          <Page />
        </Route>
        <Route path="/about">
          <Page2 />
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
