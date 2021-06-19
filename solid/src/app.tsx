import { pathIntegration, Router } from '@rturnq/solid-router'
import { createSignal } from 'solid-js'
import { isServer } from 'solid-js/web'
import { Root } from './root'

interface Props {
  url?: string
}
export const App = ({ url = '/' }: Props) => (
  // This is the important bit: use `isServer` from Solid to pass in a simple signal as an
  // integration when running on the server.
  <Router integration={isServer ? createSignal({ value: url }) : pathIntegration()}>
    <Root />
  </Router>
)
