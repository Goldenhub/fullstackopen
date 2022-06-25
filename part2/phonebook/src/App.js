import "./App.css";
import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "22334455" },
  ]);
  const [newUser, setNewUser] = useState({
    name: "",
    number: "",
  });

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
      <div>debug: {JSON.stringify(newUser)}</div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}
        </p>
      ))}
    </div>
  );
}

export default App;
