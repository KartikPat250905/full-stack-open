const Header = (props) => {
  console.log(props)
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}></Part>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}></Part>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}></Part>
    </>
  )
}

const Total = (props) => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  )
}

export default App