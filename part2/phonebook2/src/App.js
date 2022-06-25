import './App.css';
import axios from "axios";
import FilteredCountries from './components/FilteredCountries';
import {useEffect, useState} from "react"

function App() {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState('');

  function handleChange(e){
    setName(e.target.value);
  }

  function handleShow(e) {
    e.preventDefault();
    setName(e.target.elements[0].value)
  }


  const hook = () => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data);
      })
  }

  useEffect(hook, []);

  let filteredCountries = [];

  if(name){
    filteredCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(name.toLowerCase().trim());
    })
  }


  return (
    <>
      find countries {" "} <input value={name} onChange={handleChange}/>
      <FilteredCountries filter={filteredCountries} handleShow={handleShow} />
    </>
  )
}

export default App;