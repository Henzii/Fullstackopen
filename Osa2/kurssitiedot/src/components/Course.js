import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header header={course.name} />
        <Content parts={course.parts} />
        <Yhteensa parts={course.parts} />
      </div>
    )
  }
  const Yhteensa = ({parts}) => {
    return (
      <p>
        Yhteensä <b>{parts.reduce((s,p) => {
          return s+p.exercises
        },0)}</b>
      </p>
    )
  }
  const Content = ({parts}) => {
    return (
      <div>
        { parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }
  const Part = ({name, exercises}) => ( <p>{name}: {exercises}</p> )
  const Header = ({header}) => {
    return (
      <h1>{header}</h1>
    )
  }

  export default Course