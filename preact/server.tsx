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

const indexFile = path.resolve(__dirname, './public/index.html')
let blah = ''
try {
  blah = fs.readFileSync(indexFile, 'utf8')
} catch (err) {
  console.error('Something went wrong:', err)
}

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
)
const PORT = 8080

// on each request, render and return a component:
app.get('/', (req, res) => {
  const html = render(
    <Router hook={staticLocationHook(req.path)}>
      <App />
    </Router>,
  )
  // const style = extractCss()
  // send it back wrapped up as an HTML5 document:
  // TODO: Should I send css separately
  // TODO: Should I send JS separately
  // TODO: SEO for html content
  // res.send(`<!DOCTYPE html><html><head><style>${style}</style></head><body>${html}</body></html>`)

  if (!blah) {
    return res.status(500).send('Oops, better luck next time!')
  }

  return res.send(blah.replace('<div id="root"></div>', `<div id="root">${html}</div>`))
})

// app.use(express.static(path.resolve(__dirname, './dist')))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

// app.use(express.static('./build'))
