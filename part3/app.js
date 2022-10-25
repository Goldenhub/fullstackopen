/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { PORT, MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const { errorHandler, unknownEndpoint } = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const Note = require('./models/note')
const mongoose = require('mongoose')

info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(result => {
    info('connected to MongoDB')
  })
  .catch(err => {
    error('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/notes', notesRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app