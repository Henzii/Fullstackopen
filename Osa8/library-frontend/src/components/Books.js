
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const booksData = useQuery(ALL_BOOKS, { variables: { genre: props.genreFilter }})

  if (!props.show) {
    return null
  }else if (booksData.loading) {
    return (
      <div><h2>books</h2><p>Loading...</p></div>
    )
  }

  const books = booksData.data.allBooks
  const genret = () => {
    var lisatyt = []
    books.forEach(b => {
      b.genres.forEach(g => { 
        if (!lisatyt.includes(g)) lisatyt.push(g) 
      })
    })
    return lisatyt
  }
  const setGenre = (genre) => {
    console.log(genre)
    props.setGenreFilter(genre)
  }
  return (
    <div>
      <h2>books</h2>
      {(props.genreFilter && <p>Näytetään genret <b>{props.genreFilter}</b></p>)}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genret().map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <button onClick={ () => setGenre(null)}>Kaikki Genret</button>
    </div>
  )
}

export default Books