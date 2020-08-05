import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  
  return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
} 


const Statistics = ({good, neutral, bad}) => {
  
  if (good===0 && neutral===0 && bad===0)
    return(
      <div>
        No feedback given
      </div>
    )

  const all=good+neutral+bad
  const average=(good+neutral*0+bad*(-1))/all
  const positive=(good/all)*100

  return(
    <table>
      <tbody>
    <StatisticsLine text="good" value={good} />
    <StatisticsLine text="neutral" value={neutral}/>
    <StatisticsLine text="bad" value={bad}/>
    <StatisticsLine text="all" value={all}/>
    <StatisticsLine text="average" value={average}/>
    <StatisticsLine text="positive" value={positive+" %"}/>
     </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  return (
    
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/> 
      <Button onClick={handleNeutralClick} text="neutral"/> 
      <Button onClick={handleBadClick} text="bad"/> 
      
      <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
