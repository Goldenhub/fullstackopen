import Header from "./Header"
import Content from "./Content"

function Course({course}) {
    return (
        <>
            <Header course={course.name} />
            <Content key={course.key} parts={course.parts} />
        </>
    )
}

export default Course;