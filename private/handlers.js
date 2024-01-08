module.exports = { serveFile, handleApi }

const { crud } = require('../public/crud.js')
const fs = require('fs')



function serveFile(req, res) {
  var path = 'public' + req.url
  if (req.url == '/') path += 'index.html'
  try {
    const fileContent = fs.readFileSync(path)
    res.end(fileContent)
  } catch (error) {
    res.statusCode = 404
    res.end('file not found')
  }
}

async function handleApi(req, res) {
  const endpoint = req.url.slice(5)
  const body = await getBody(req) || '{}'
  const payload = JSON.parse(body)

  if (endpoint == 'create') {
    const { str } = payload
    try {
      crud.c(str)
      res.end()
    } catch (error) {
      res.statusCode = 400
      res.end(JSON.stringify({ error }))
    }

  } else if (endpoint == 'read') {
    res.end(JSON.stringify(crud.r()))

  } else if (endpoint == 'update') {
    const { oldStr, newStr } = payload
    try {
      crud.u(oldStr, newStr)
      res.end()
    } catch (error) {
      res.statusCode = 400
      res.end(JSON.stringify({ error }))
    }

  } else if (endpoint == 'delete') {
    const { str } = payload
    try {
      crud.d(str)
      res.end()
    } catch (error) {
      res.statusCode = 400
      res.end(JSON.stringify({ error }))
    }

  } else {
    res.statusCode = 404
    res.end(JSON.stringify({ error: "API endpoint doesn't exist" }))
  }
}

async function getBody(req) {
  let body = ''
  for await (const chunk of req) body += chunk
  return body
}

