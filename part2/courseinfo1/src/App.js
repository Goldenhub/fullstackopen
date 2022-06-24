import "./App.css";
import Course from "./components/Course"

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  const total = course.parts.map(item => item.exercises).reduce((acc, el) => acc + el, 0);

  return <>
    <Course course={course} />
    <h3>total of {total} exercises</h3>  
  </>
}

export default App;
