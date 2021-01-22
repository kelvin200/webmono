import { hydrate } from 'preact'
import { Router } from 'wouter-preact'
import { App } from './src/app'

window.onload = () => {
  hydrate(
    <Router>
      <App />
    </Router>,
    document.getElementById('root')!,
  )
}
