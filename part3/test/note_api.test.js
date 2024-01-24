/* eslint-disable indent */
/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Note = require('../models/note')

const initialNote = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    important: true,
  },
]

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNote[0])
    await noteObject.save()
    noteObject = new Note(initialNote[1])
    await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  expect(response.body.data).toHaveLength(initialNote.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.data.map(note => note.content)

  expect(contents).toContain('Browser can execute only JavaScript')
})

afterAll(async () => {
  await mongoose.connection.close()
})
