function Header({course}) {
  return(
    <>
      <h1>{course}</h1>
    </>
  );
}
function Content({part1, part2, part3, exercises1, exercises2, exercises3}) {
  return(
    <div>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
    </div>
  )
}
function Total({exercises1, exercises2, exercises3}) {
  return(
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  );
}

function Part({part, exercise}) {
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  )
}

function App() {
  const course = "Half Stack application development";
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1.name} 
        part2={part2.name} 
        part3={part3.name} 
        exercises1={part1.exercises} 
        exercises2={part2.exercises} 
        exercises3={part3.exercises} 
      />
      <Total 
        exercises1={part1.exercises} 
        exercises2={part2.exercises} 
        exercises3={part3.exercises} 
      />
      
    </div>
  );
}

export default App;