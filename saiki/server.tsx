import express from 'express'
import fs from 'fs'
import path from 'path'
import render from 'preact-render-to-string'
import { Router } from 'wouter-preact'
import staticLocationHook from 'wouter-preact/static-location'
import { App } from './src/app'
import encrypt from '@kami/crypto/encrypt'

// basic HTTP server via express:
const app = express()

const webpack = require('webpack')
const config = require('./webpack.config.js')
const compiler = webpack(config)

const webpackDevMiddleware = require('webpack-dev-middleware')

const templateFile = path.resolve(__dirname, './template.html')
let htmlTemplate = ''
try {
  htmlTemplate = fs.readFileSync(templateFile, 'utf8')
} catch (err) {
  console.error('Something went wrong:', err)
}

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
)

// app.use(express.static(path.resolve(__dirname, './dist')))

app.use(express.static('./public'))

const PORT = 8080

const clientConfig = { myobj: 'vlah' }

// on each request, render and return a component:
app.get('/*', (req, res, next) => {
  if (req.originalUrl.startsWith('/asset')) return next()

  const html = render(
    <Router hook={staticLocationHook(req.path)}>
      <App config={clientConfig} />
    </Router>,
  )
  // TODO: SEO for html content
  if (!htmlTemplate) {
    return res.status(500).send('Oops, better luck next time!')
  }

  const na = encrypt(clientConfig)

  return res.send(
    htmlTemplate
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace('<div id="na"></div>', `<div id="na">${na}</div>`),
  )
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
