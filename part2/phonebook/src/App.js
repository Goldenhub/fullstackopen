import './App.css';
import {useState} from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  function handleSubmit(e){
    e.preventDefault();
    // console.log(e.target)
    let stringedPersons = JSON.stringify(persons);
    let check = stringedPersons.includes(JSON.stringify({name: newName}));
    if(!check){
      setPersons(persons.concat({name: newName}))
      setNewName('');
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  function handleChange(e){
    setNewName(e.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App;
