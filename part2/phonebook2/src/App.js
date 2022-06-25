import './App.css';
import axios from "axios";
import {useEffect, useState} from "react"

function App() {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      {persons.map(person => {
        return <p key={person.id}>{person.name}: {person.number}</p>
      })}
    </div>
  )
}

export default App;
