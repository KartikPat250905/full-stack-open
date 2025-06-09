import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = (({course})=> {
    return (
        <>
            <Header course={course}></Header>
            <Content course={course}></Content>
            <Total course={course}></Total>
        </>
    )
})

export default Course