import { setup } from 'goober'
import { nanoid } from 'nanoid'
import { h } from 'preact'
import { useReducer } from 'preact/hooks'
import { Link, LinkProps, Redirect, Route, Switch, useRoute } from 'wouter-preact'
import { Page, Page2 } from './component'
import { DEFAULT_STATE, RootReducer, StoreContext } from './store'

setup(h)

const ActiveLink = (props: LinkProps) => {
  const [isActive] = useRoute(props.href || '')
  return (
    <Link {...props}>
      <a className={isActive ? 'active' : ''}>{props.children}</a>
    </Link>
  )
}

const SCRIPTS_ID = nanoid(5)

export const App = () => {
  const [state, dispatch] = useReducer(RootReducer, DEFAULT_STATE)
  const store = { state, dispatch }

  return (
    <StoreContext.Provider value={store}>
      <div className="App">
        <div id={SCRIPTS_ID}>
          {state.urls.map(u => (
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
    </StoreContext.Provider>
  )
}
