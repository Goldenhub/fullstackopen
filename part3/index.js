/* eslint-disable linebreak-style */
const app = require('./app')
const { info } = require('.utils/logger')
const http = require('http')
const { PORT } = require('utils/config')

const server = http.createServer(app)

server.listen(PORT, () => {
  info(`Server running on Port ${PORT}`)
})
