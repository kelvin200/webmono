import express from 'express'
import fs from 'fs'
import path from 'path'
import render from 'preact-render-to-string'
import { Router } from 'wouter-preact'
import staticLocationHook from 'wouter-preact/static-location'
import { App } from './src/app'

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

// on each request, render and return a component:
app.get('/*', (req, res, next) => {
  if (req.originalUrl.startsWith('/asset')) return next()

  const html = render(
    <Router hook={staticLocationHook(req.path)}>
      <App />
    </Router>,
  )
  // TODO: SEO for html content
  if (!htmlTemplate) {
    return res.status(500).send('Oops, better luck next time!')
  }

  return res.send(htmlTemplate.replace('<div id="root"></div>', `<div id="root">${html}</div>`))
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
