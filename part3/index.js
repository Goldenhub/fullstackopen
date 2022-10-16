const express = require('express')

let notes = [
    {
      "content": "newNote",
      "date": "27th June 2022",
      "important": false,
      "id": 1
    },
    {
      "content": "Hello",
      "date": "2022-07-23T11:50:11.113Z",
      "important": true,
      "id": 2
    },
    {
      "content": "Hello",
      "date": "2022-07-23T11:50:39.097Z",
      "important": true,
      "id": 3
    },
    {
      "content": "Hello",
      "date": "2022-07-23T11:52:31.803Z",
      "important": true,
      "id": 4
    },
    {
      "content": "",
      "date": "2022-07-23T11:52:33.202Z",
      "important": false,
      "id": 5
    },
    {
      "content": "How asda",
      "date": "2022-07-23T11:52:43.260Z",
      "important": true,
      "id": 6
    },
    {
      "content": "helo",
      "date": "2022-07-23T13:22:17.576Z",
      "important": true,
      "id": 8
    },
    {
      "content": "helo",
      "date": "2022-10-15T15:01:11.309Z",
      "important": true,
      "id": 9
    },
    {
      "content": "rrrrrt",
      "date": "2022-10-15T15:11:34.958Z",
      "important": true,
      "id": 10
    },
    {
      "content": "test me",
      "date": "2022-10-15T15:16:12.327Z",
      "important": true,
      "id": 11
    }
  ]

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.send(notes)
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


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started running on PORT ${PORT}` );
});