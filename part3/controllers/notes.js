/* eslint-disable linebreak-style */
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json({ status: 200, message: 'successfully', data: notes })
  })
})

notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndRemove(id)
    .then(note => {
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

notesRouter.post('/', (request, response, next) => {
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

notesRouter.put('/:id', (request, response, next) => {
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

module.exports = notesRouter
