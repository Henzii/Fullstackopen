import React, { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import Luettelo from './components/Luettelo'
import personServer from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filtteri, setFilter] = useState('')
  const [notification, setNotification] = useState({msg: null, type: null})

  const filterChange = (event) => setFilter(event.target.value)
  const numberChange = (event) => setNewNumber(event.target.value)
  const nameChange = (event) => setNewName(event.target.value)
  const addNewName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    let i = persons.filter(person => person.name === newName).length
    if (i > 0) {
      if (window.confirm(`Henkilö ${newName} on jo listalla. Päivitetäänkö puhelinnumero?`)) {
        const oldPerson = persons.find(p => p.name === newName)
        const newPerson = {...oldPerson, number: newNumber}
//        console.log("Päivitetään", oldPerson, newPerson)
        personServer.updatePerson(oldPerson.id, newPerson).then(res => {
          setPersons( persons.filter(p=> p.id !== res.id).concat(res))
          notify("Numero päivitetty onnistuneesti!")
        }).catch(() => {
          notify("Henkilön tietoja ei lödy palvelimelta.", "error")
        })
      }
    } else {
        personServer.addPerson(newPerson).then(res => {
          setPersons(persons.concat(res))
          notify(`Henkilö ${newPerson.name} lisättiin!`)
        }).catch(() => {
          notify("Jokin meni pieleen ja henkilöä ei lisätty!", "error")
        })
    }
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = (id) => {
    const nimi = persons.find(p => p.id === id).name
    if (window.confirm(`Poistetaanko ${nimi} varmasti!?`)) {
      personServer.deletePerson(id).then(res => {
        const uudetPersoonat = persons.filter(p => p.id !== id)
        setPersons(uudetPersoonat)
        notify(`Henkilö ${nimi} poistettiin onnistuneesti.`)
      }).catch(() => {
        notify("Henkilön tietoja ei lödy palvelimelta.", "error")
      })

    }
  }
  const notify = (msg, type) => {
    setNotification({msg, type})
    setTimeout( () => {
      setNotification({msg: null, type: null})
    }, 3000)
  }
  useEffect(() => {
      personServer.getPersons().then(res => {
        setPersons(res)
      })
  },[])
  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <AddPerson addNewName={addNewName} newName={newName} newNumber={newNumber}
                nameChange={nameChange} numberChange={numberChange} />
      <p>Filtteri: <input onChange={filterChange}/></p>
      <h2>Numbers</h2>
        <Luettelo persons={persons} filtteri={filtteri} onDelete={deletePerson} />
    </div>
  )

}


export default App