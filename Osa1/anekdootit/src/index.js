import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return(
  <button onClick={onClick}>
    {text}
    </button>
  )
}

const VoteLeader = ({anecdotes, votes}) => {
  const biggest=Math.max(...votes)
  
  const indexOfBiggest=votes.indexOf(biggest)
  return( 
    <div>
    <p>{anecdotes[indexOfBiggest]}</p>
    <p>has {biggest} votes </p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  // the array.apply... below creates array filled with 0's. Length is equal to the lenght of anecdotes. FROM: https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))

  
  const handleNextAnectdoteClick = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))

  }

  const handleVoteClick = () => {
    const copy=[...votes]
    copy[selected]=copy[selected]+1
    setVotes(copy)
       
  }

  


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>

      
      <p>has {votes[selected]} votes </p>

      <p>
      <Button onClick={handleVoteClick}  text = "vote"/>
      <Button onClick={handleNextAnectdoteClick} text="next anecdote" />
      </p>
      
      
    
      <h1>Anecdote with most votes</h1>
      
      
      <VoteLeader anecdotes={props.anecdotes} votes={votes} />
      </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
) 