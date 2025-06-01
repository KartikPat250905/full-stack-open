const Header = (props) => {
  console.log(props)
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.info[0].name} {props.info[0].exercises}
      </p>
      <p>
        {props.info[1].name} {props.info[1].exercises}
      </p>
      <p>
        {props.info[2].name} {props.info[2].exercises}
      </p>
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