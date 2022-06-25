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
    output = filter.map((filtered, i) => {
      return (
        <div key={i}>
          <h3>{filtered.name.common}</h3>
          <p>Capital {filtered.capital[0]}</p>
          <p>Area {filtered.area}</p>
          <ul>
            {Object.values(filtered.languages).map((lang) => {
              return <li key={lang}>{lang}</li>;
            })}
          </ul>
          <img src={filtered.flags.svg} alt="flag" width={200} />
        </div>
      );
    });
  } else {
    output = <p>Too many matches, specify another filter</p>;
  }
  return <>{output}</>;
}

export default FilteredCountries;
