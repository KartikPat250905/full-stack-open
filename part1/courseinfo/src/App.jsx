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
      <Part name={props.info[0].name} exercises={props.info[0].exercises}></Part>
      <Part name={props.info[1].name} exercises={props.info[1].exercises}></Part>
      <Part name={props.info[2].name} exercises={props.info[2].exercises}></Part>
    </>
  )
}

const Total = (props) => {
  const total = props.info[0].exercises + props.info[1].exercises + props.info[2].exercises
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const info = [{name:part1, exercises:exercises1}, 
                {name:part2, exercises:exercises2}, 
                {name:part3, exercises:exercises3}]
  return (
    <div>
      <Header course={course} />
      <Content info={info}></Content>
      <Total info={info}></Total>
    </div>
  )
}

export default App