import './App.css';
import axios from "axios";
import {useEffect, useState} from "react"

function App() {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState('');

  function handleChange(e){
    setName(e.target.value);
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
      return country.name.common.includes(name.trim());
    })
  }

  let output = '';

  if(filteredCountries.length === 0){
    output = <p>Enter a valid country name to filter</p>
  }else if(filteredCountries.length <= 10 && filteredCountries.length > 1){
    output = filteredCountries.map(filtered => {
      return <p key={filtered.name.common}>{filtered.name.common}</p>;
    });
  }else if(filteredCountries.length === 1){
    output = filteredCountries.map(filtered => {
      return (
        <div key={filtered.name.common}>
          <h3>{filtered.name.common}</h3>
          <p>Capital {filtered.capital[0]}</p>
          <p>Area {filtered.area}</p>
          <ul>
            {Object.values(filtered.languages).map(lang => {
              return <li key={lang}>{lang}</li>
            })}
          </ul>
          <img src={filtered.flags.svg} alt="flag" width={200} />
        </div>
      )
    });
  }else{
    output = <p>Too many matches, specify another filter</p>
  }


  return (
    <>
      find countries {" "} <input value={name} onChange={handleChange}/>
      {output}
    </>
  )
}

export default App;