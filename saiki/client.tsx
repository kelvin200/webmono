import { hydrate } from 'preact'
import { Router } from 'wouter-preact'
import { App } from './src/app'

document.addEventListener('DOMContentLoaded', () => {
  hydrate(
    <Router>
      <App />
    </Router>,
    document.getElementById('root')!,
  )
})
