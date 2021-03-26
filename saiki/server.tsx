import express from 'express'
import render from 'preact-render-to-string'
import { Router } from 'wouter-preact'
import staticLocationHook from 'wouter-preact/static-location'
import { config as clientConfig } from './sample/artificialturf'
import { App } from './src/app'

// basic HTTP server via express:
const app = express()

const webpack = require('webpack')
const config = require('./webpack.config.js')
const compiler = webpack(config)

const webpackDevMiddleware = require('webpack-dev-middleware')

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My site</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link rel="shortcut icon" href="/asset/favicon.ico" />
    <link rel="apple-touch-icon" href="/asset/icon/apple-touch-icon.png" />
    <script type="text/javascript" src="/keyweb-bundle.js"></script>
    <!-- <script type="text/javascript" src="/keyweb-vendors.js"></script> -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

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
      <App config={clientConfig as any} />
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
