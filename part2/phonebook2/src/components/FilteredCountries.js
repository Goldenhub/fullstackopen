import WeatherInfo  from "./WeatherInfo";

function FilteredCountries({ filter, handleShow }) {
  
  let output = "";

  if (filter.length === 0) {
    output = <p>Enter a valid country name to filter</p>;
  } else if (filter.length <= 10 && filter.length > 1) {
    output = filter.map((filtered) => {
      return (
        <form key={filtered.name.common} onSubmit={handleShow}>
          <p>{filtered.name.common}</p>
          <input type="hidden" value={filtered.name.common}/>
          <button type="submit">
            show
          </button>
          <hr />
        </form>
      );
    });
  } else if (filter.length === 1) {
    output =  <div>
                <h3>{filter[0].name.common}</h3>
                <p>Capital {filter[0].capital[0]}</p>
                <p>Area {filter[0].area}</p>
                <h3>Languages</h3>
                <ul>
                  {Object.values(filter[0].languages).map((lang) => {
                    return <li key={lang}>{lang}</li>;
                  })}
                </ul>
                <img src={filter[0].flags.svg} alt="flag" width={200} />
                <WeatherInfo capital={filter[0].capital} />
              </div>      
  } else {
    output = <p>Too many matches, specify another filter</p>;
  }
  return <>{output}</>;
}

export default FilteredCountries;
