import React from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useMutation, useQuery } from '@apollo/client'

const Authors = (props) => {

  const authorsData = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(`Error! ${error.graphQLErrors[0].message}`)
    }
  })

  if (!props.show) {
    return null
  } else if (authorsData.loading) {
    return (<div><h2>authors</h2><p>Loading...</p></div>)
  }

  const authors = authorsData.data.allAuthors
  
  const handleForm = (e) => {
    e.preventDefault()
    editAuthor({ variables: { name: e.target.author.value, setBornTo: Number(e.target.birthyear.value) } })
    e.target.birthyear.value = ''

  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <div>
        <form onSubmit={handleForm}>
          <select name="author">
            {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
          <div>Birthyear: <input type="text" name="birthyear" /> <button type="submit">change</button></div>
        </form>
      </div>
    </div>
  )
}

export default Authors