import { hydrate } from 'preact'
import { Router } from 'wouter-preact'
import { App } from './src/app'
import decrypt from '@kami/crypto/decrypt'

document.addEventListener('DOMContentLoaded', () => {
  const config = decrypt(
    document.getElementById('ke')?.innerHTML,
    document.getElementById('na')?.innerHTML,
  )

  // console.log('CONFIG', config)

  hydrate(
    <Router>
      <App config={config} />
    </Router>,
    document.getElementById('root')!,
  )
})
