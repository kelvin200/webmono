import { hydrate } from 'preact'
import { App } from './src/app'

window.onload = () => {
  hydrate(App(), document.getElementById('root')!)
}
