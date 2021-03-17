const Luettelo = ({persons, filtteri, onDelete}) => {
    return (
      <div>
        {persons.filter(person => {
          if (filtteri.length === 0 || person.name.toLowerCase().indexOf(filtteri.toLowerCase()) !== -1) return true
          return false
        }).map(person => <Number key={person.id} 
                                 person={person} 
                                 onDelete={() => onDelete(person.id)} />)}
      </div>
    )
  }
  const Number = ({person, onDelete}) => {
    return (
      <div>{person.name} - {person.number} <button onClick={onDelete}>x</button></div>
    )
  }

  export default Luettelo