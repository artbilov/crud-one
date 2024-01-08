const { createServer } = require('http')
const { servFile, handleApi } = require('./private/handlers.js')
const server = createServer(handleRequest)
const port = 1234

server.listen(port, () => {
  console.log('Server is running on http://localhost:' + port)
})

function handleRequest(req, res) {
  if (req.url.startsWith('/api/')) handleApi(req, res)
  else servFile(req, res)
}