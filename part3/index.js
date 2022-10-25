/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
require ('dotenv').config()
const app = express()
const cors = require('cors')

const Note = require('./models/note')



app.use(express.json())
app.use(cors())
app.use(express.static('build'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json({ status: 200, message: 'successfully', data: notes })
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id

  Note.findById(id)
    .then(note => {
      if(note)
        response.json({ status: 200, message: 'Successful', data: note })
      else{
        response.statusMessage = 'Resource Not Found'
        response.status(404).json({ status: 404, message: 'Uh oh! Can\'t find something' })
      }
    })
    .catch(err => next(err))

})



app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndRemove(id)
    .then(note => {
      console.log(note)
      if (note) {
        response.statusMessage = 'Note Deleted'
        response.status(204).end()
      }
      else {
        response.statusMessage = 'Resource Not Found'
        response.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
      response.json({ status: 200, message: 'Note Added', data: savedNote })
    })
    .catch(err => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const { content, important } = request.body
  Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json({ status: 204, message: 'successfully updated', data: updatedNote })
    })
    .catch(err => next(err))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ status: 404, error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    response.status(400).json({ status: 400, error: 'malformatted ID' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ status: 400, error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started running on PORT ${PORT}`)
})