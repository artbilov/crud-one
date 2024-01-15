require('dotenv').config()
const { createServer } = require('http')
const { serveFile, handleApi } = require('./private/handlers.js')

const server = createServer(handleRequest)
const port = 1234

server.listen(port, () => {
  console.log('Server is running on http://localhost:' + port)
})

function handleRequest(req, res) {
  if (req.url.startsWith('/api/')) handleApi(req, res)
  else serveFile(req, res)
}