import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

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
  <body>renderToString, resolveSSRNode 
    <div id="root"></div>
  </body>
</html>`

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: SSR, SEO for html content
  return {
    statusCode: 200,
    body: htmlTemplate,
  }
}
