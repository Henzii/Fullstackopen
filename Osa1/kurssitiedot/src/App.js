import React from 'react'

const Header = (props) => {
    return (
     <div>
        <h1>{props.otsikko}</h1>
     </div>
	)
}
const Content = (props) => {
    console.log(props)
    return (
        <div>
            <Part nimi={props.osat[0].name} numero={props.osat[0].exercises} />
            <Part nimi={props.osat[1].name} numero={props.osat[1].exercises} />
            <Part nimi={props.osat[2].name} numero={props.osat[2].exercises} />
        </div>
	)
}
const Part = (props) => {
    return (
        <div>
        <p>{props.nimi} {props.numero}</p>
        </div>
	)
}
const Total = (props) => {
    var summa = props.osat[0].exercises+props.osat[1].exercises+props.osat[2].exercises
    return (
        <div>
           <p>Number of excercises {summa}</p>
        </div>
	)
}
const App = () => {

      const course = {
          name: 'Half Stack application development',
          parts: [
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
      }
      return (
        <div>
          <Header otsikko={course.name} />
          <Content osat={course.parts} />
          <Total osat={course.parts} />
        </div>
      )

}

export default App;
