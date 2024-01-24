/* eslint-disable no-unused-vars */
const { info, error } = require('./logger')

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

const errorHandler = (err, request, response, next) => {
  error(err.message)

  if (err.name === 'CastError') {
    response.status(400).json({ status: 400, error: 'malformatted ID' })
  } else if (err.name === 'ValidationError') {
    response.status(400).json({ status: 400, error: err.message })
  }

  next(err)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ status: 404, error: 'unknown endpoint' })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
}