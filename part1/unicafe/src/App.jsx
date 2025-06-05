import { useState } from 'react'

const StasticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({stats}) => {
  const { good, neutral, bad, total, average, positivefeedback } = stats;

  if (total === 0)
    return <p>No Feedback Given</p>

  return (
    <table>
      <tbody>
        <StasticsLine text="Good" value={good}></StasticsLine>
        <StasticsLine text="Neutral" value={neutral}></StasticsLine>
        <StasticsLine text="Bad" value={bad}></StasticsLine>
        <StasticsLine text="Total" value={total}></StasticsLine>
        <StasticsLine text="Average" value={average}></StasticsLine>
        <StasticsLine text="Positive Feedback" value={positivefeedback}></StasticsLine>
      </tbody>
    </table>
  )
}

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
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
        <Button onClick={handleGoodClick} text="Good"></Button>
        <Button onClick={handleNeutralClick} text="Neutral"></Button>
        <Button onClick={handleBadClick} text="Bad"></Button>
        <h3>Current Stastics</h3>
        <Statistics stats={stats}></Statistics>
    </div>
  )
}

export default App