import Part from "./Part"

function Content({ key, parts }) {
  return (
    <>
      {parts.map((part) => {
        return <Part key={key} part={part} />
      })}
    </>
  );
}

export default Content;
