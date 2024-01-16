module.exports = { serveFile, handleApi }

// const { crud } = require('../public/await crud.js')
// const { crud } = require('./crud-fs.js')
const { prepareCRUD } = require('./crud-mongo.js')
let crud
const fs = require('fs')

prepareCRUD().then(_crud => crud = _crud)

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
      await crud.c(str)
      res.end()
    } catch (error) {
      res.statusCode = 400
      res.end(JSON.stringify({ error }))
    }

  } else if (endpoint == 'read') {
    res.end(JSON.stringify(await crud.r()))

  } else if (endpoint == 'update') {
    const { oldStr, newStr } = payload
    try {
      await crud.u(oldStr, newStr)
      res.end()
    } catch (error) {
      res.statusCode = 400
      res.end(JSON.stringify({ error }))
    }

  } else if (endpoint == 'delete') {
    const { str } = payload
    try {
      await crud.d(str)
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

