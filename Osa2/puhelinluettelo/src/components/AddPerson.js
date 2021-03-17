const AddPerson = ({addNewName, newName, newNumber, nameChange, numberChange}) => {
    return (
      <form onSubmit={addNewName}>
          <div>
            name: <input value={newName} onChange={nameChange} /> <br />
            number: <input value={newNumber} onChange={numberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default AddPerson