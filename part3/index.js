const express = require('express')
require ('dotenv').config()
const app = express();
const cors = require('cors')

const Note = require('./models/note')

// const mongoose = require('mongoose');


app.use(express.json());
app.use(cors());
app.use(express.static('build'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  
  const note = notes.find(note => note.id === id);

  if (note) {
    response.send(note);
  } else {
    response.statusMessage = "Resource Not Found";
    response.status(404).json({ status: 404, message: "Uh oh! Can't find something"});
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.statusMessage = "Resource Deleted";
  response.status(204).json({ status: 204, message: "Resource Deleted"});
})

const generateID = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
}

app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      "error": "content missing"
     })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    date: new Date(),
    id: generateID()
  }
  notes = notes.concat(note);
  response.json({status: 200, message: "Note Added", data: note});
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started running on PORT ${PORT}` );
})