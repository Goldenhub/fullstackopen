const express = require('express')
require ('dotenv').config()
const app = express();
const cors = require('cors')

const Note = require('./models/note')



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
  const id = request.params.id;
  
  Note.findById(id)
    .then(note => {
      if(note)
        response.json({ status: 200, message: "Successful", data: note });
      else{
        response.statusMessage = "Resource Not Found";
        response.status(404).end();      
      }
  })
    .catch(err => {
      response.statusMessage = "Resource Not Found";
      response.status(404).json({ status: 404, message: "Uh oh! Can't find something"});
  })

})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  Note.findByIdAndRemove(id)
    .then(note => {
      console.log(note)
      if (note) {
        response.statusMessage = "Note Deleted";
        response.status(200).end();
      }
      else {
        response.statusMessage = "Resource Not Found";
        response.status(404).end();
      }
    })
    .catch(err => {
      response.statusMessage = "Resource Not Found";
      response.status(404).json({ status: 404, message: "Uh oh! Can't find something" });
    })
})

app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      "error": "content missing"
     })
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
    date: new Date(),
  })
  
  note.save().then(savedNote => {
    response.json({status: 200, message: "Note Added", data: savedNote});
  })
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started running on PORT ${PORT}` );
})