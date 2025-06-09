import Content from "./Content";
import Header from "./Header";

const Course = (({course})=> {
    return (
        <>
            <Header course={course}></Header>
            <Content course={course}></Content>
        </>
    )
})

export default Course