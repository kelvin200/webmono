import { Component, createSignal, onCleanup } from 'solid-js'
import { Match, Switch } from 'solid-js/web'
import { List } from './list'

function createRouteHandler() {
  const [location, setLocation] = createSignal(window.location.hash.slice(1) || 'home'),
    locationHandler = () => setLocation(window.location.hash.slice(1))
  window.addEventListener('hashchange', locationHandler)
  onCleanup(() => window.removeEventListener('hashchange', locationHandler))
  return (match: string) => match === location()
}

const Home: Component = () => (
  <>
    <h1>Welcome to this Simple Routing Example</h1>
    <p>Click the links in the Navigation above to load different routes.</p>
  </>
)

const Profile: Component = () => (
  <>
    <h1>Your Profile</h1>
    <p>This section could be about you.</p>
  </>
)

const Settings: Component = () => (
  <>
    <h1>Settings</h1>
    <p>All that configuration you never really ever want to look at.</p>
  </>
)

export const Root = () => {
  const matches = createRouteHandler()
  return (
    <>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#profile">Profile</a>
        </li>
        <li>
          <a href="#settings">Settings</a>
        </li>
      </ul>
      <Switch>
        <Match when={matches('home')}>
          <List />
        </Match>
        <Match when={matches('profile')}>
          <Profile />
        </Match>
        <Match when={matches('settings')}>
          <Settings />
        </Match>
      </Switch>
    </>
  )
}
