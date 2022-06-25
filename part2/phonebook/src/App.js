import "./App.css";
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newUser, setNewUser] = useState({
    name: "",
    number: "",
  });

  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  function handleFilter(e){
    setFilter(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    let stringedPersons = JSON.stringify(persons);
    let checkName = stringedPersons.includes(JSON.stringify(newUser.name.trim()));
    let checkNumber = stringedPersons.includes(JSON.stringify(newUser.number.trim()));
    if (!checkName && !checkNumber) {
      setPersons(persons.concat(newUser));
      setNewUser((prev) => ({
        ...prev,
        name: "",
        number: "",
      }));
    } else {
      if(checkName && checkNumber){
        alert(`${newUser.name.trim()} details is already added to phonebook`);
      }else if(checkNumber){
        alert(`${newUser.number.trim()} is already added to phonebook`);
      }else{
        alert(`${newUser.name.trim()} is already added to phonebook`);
      }
    }
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />
      

      <h2>Add New</h2>

      <PersonForm handleSubmit={handleSubmit} handleChange={handleChange} user={newUser}/>

      <h2>Numbers</h2>

      <Persons filtered={filteredPersons} />
      
    </div>
  );
}

export default App;
