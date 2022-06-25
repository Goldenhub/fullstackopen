import Note from "./components/Note"
import './App.css';
import {useState} from "react";

function App(prop) {
  const [notes, setNotes] = useState(prop.notes)
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)

  function addNote(evt){
    evt.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  function handleChange(evt){
    console.log("Value Changed", evt.target.value)
    setNewNote(evt.target.value);
  }

  function ToggleShow() {
    setShowAll(!showAll);
  }

  const notesToShow = showAll 
            ? notes 
            : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <button type="button" onClick={ToggleShow}>{showAll ? 'Important' : 'All'}</button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App;
