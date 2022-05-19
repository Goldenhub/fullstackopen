import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Header = () => {
  return (
    <header>
      <h1>give feedback</h1>
    </header>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad, sum }) => {
  if (sum === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h2>Statistics</h2>

      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="positive" value={`${sum && (good / sum) * 100}%`} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [sum, setSum] = useState(0);

  function _setSum() {
    return setSum((prev) => {
      return prev + 1;
    });
  }

  function handleGood() {
    setGood((prev) => {
      return prev + 1;
    });
    _setSum();
  }
  function handleNeutral() {
    setNeutral((prev) => {
      return prev + 1;
    });
    _setSum();
  }
  function handleBad() {
    setBad((prev) => {
      return prev + 1;
    });
    _setSum();
  }

  return (
    <div>
      <Header />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} />
    </div>
  );
};

export default App;
