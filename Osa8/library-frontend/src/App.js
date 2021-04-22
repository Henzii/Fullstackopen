import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { LOGIN, ME, BOOK_ADDED, ALL_BOOKS} from './queries'
import { useMutation, useQuery, useSubscription, useApolloClient} from '@apollo/client'


const App = (props) => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  
  const [message, setMessage] = useState('')
  const notify = (message, time) => {
      setTimeout( () => {
        setMessage(null)
      }, (time*1000) )
      setMessage(message)
  }


  const [genreFilter, setGenreFilter] = useState(null)

  const [login, response] = useMutation(LOGIN)
  
  const me = useQuery(ME)

  const client = useApolloClient()

  const logout = () => {
    localStorage.clear()
    setToken(null)
  }

  useEffect(() => {
    if (response.data) {
      localStorage.setItem('books-token', response.data.login.value)
      setToken(response.data.login.value)
    }
  }, [response.data])
// -------- Subsciption juttuja -----

  const updateCacheWith = (addedBook) => {
    const sisaltaa = (set, object) => set.map(p => p.title).includes(object.title)
    const dataInStore = client.readQuery( { query: ALL_BOOKS, variables: { genre: null }})
    console.log('Data=', dataInStore)
    console.log('Added=', addedBook)
    if (!sisaltaa(dataInStore.allBooks, addedBook)) {
      console.log('Ei löydy välimuistista...')
      client.writeQuery( {
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook)},
        variables: { genre: null },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      notify('Uusi kirja havaittu!', 2)
      updateCacheWith( subscriptionData.data.bookAdded )
    }
  })
// ---------------------------------
  const handleLogin = (e) => {
    e.preventDefault()

    login({ variables: { name: e.target.tunnus.value, password: e.target.password.value } }).catch(() => {
      notify('Virhe kirjautumisessa!', 5)
    }).finally(() => {
      notify('Olet kirjautunut sisään!', 5)
      e.target.tunnus.value = ''
      e.target.password.value = ''
      setPage('books')
    })
 }
  const showRecommended = () => {
    setGenreFilter (me.data.me.favoriteGenre )
  }
  return (
    <div>
      <div>
        {(message && <div>{message}</div>)}
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(token) ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={showRecommended}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
          : <button onClick={() => setPage('login')}>login</button>}
      </div>
      <LoginForm show={page === 'login'} handleLogin={handleLogin}
      />
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'} setGenreFilter={setGenreFilter} genreFilter={genreFilter}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App