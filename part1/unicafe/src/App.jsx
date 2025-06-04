import { useState } from 'react'

const Statistics = ({stats}) => {
  const { good, neutral, bad, total, average, positivefeedback } = stats;

  if (total === 0)
    return <p>No Feedback Given</p>

  return (
    <>
      <h3>Current Stastics</h3>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Average: {average}</p>
      <p>Positive Feedback: {positivefeedback}%</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positivefeedback = total === 0 ? 0 : good / total * 100
  const stats = { good, neutral, bad, total, average, positivefeedback };
  return (
    <div>
      <h3>Give Feedback</h3>
        <button onClick={handleGoodClick}>Good</button>
        <button onClick={handleNeutralClick}>Neutral</button>
        <button onClick={handleBadClick}>Bad</button>
        <Statistics stats={stats}></Statistics>
    </div>
  )
}

export default App