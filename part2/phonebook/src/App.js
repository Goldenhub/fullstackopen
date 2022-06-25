import "./App.css";
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
  console.log(filteredPersons);

  function handleFilter(e){
    setFilter(e.target.value )
  }

  function handleSubmit(e) {
    e.preventDefault();

    // console.log(e.target)
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
      <h4>Filter shown with<input value={filter} onChange={handleFilter} /></h4>

      <h2>Add New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newUser.name} name="name" onChange={handleChange} />
        </div>
        <div>
          number:{" "}
          <input value={newUser.number} name="number" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}
        </p>
      ))}
    </div>
  );
}

export default App;
