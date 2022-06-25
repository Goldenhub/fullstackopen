import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

function Course({course}) {
    const total = course.parts.map(item => item.exercises).reduce((acc, el) => acc + el, 0);
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </>
    )
}

export default Course;