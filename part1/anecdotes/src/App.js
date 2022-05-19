import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  function handleClick() {
    setSelected(prev => {
      return Math.floor(Math.random() * anecdotes.length)
    })
  }
  function handleVote() {
    setVote(prev => {
      let newArr = [...prev]
      newArr[selected] += 1
      return newArr
    })
  }
  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} Vote</p>
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleClick} text='next anecdote' />

      <Header text='Anecdote with most votes' />
      {
        vote.every(e => e === 0) ? <p>Vote for an anecdote</p> :
        <>
          <p>{anecdotes[vote.indexOf(Math.max(...vote))]}</p>
          <p>has {Math.max(...vote)} Vote</p>
        </>
      }
    </div>
  )
}

export default App