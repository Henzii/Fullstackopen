import axios from 'axios'

const pUrl = "http://localhost:3001/persons"

const getPersons = () => {
    const kysely = axios.get(pUrl)
    return kysely.then(res => res.data)
}
const addPerson = (personObject) => {
    const kysely = axios.post(pUrl, personObject)
    return kysely.then(res => res.data)
}
const deletePerson = (id) => {
    const kysely = axios.delete(`${pUrl}/${id}`)
    return kysely.then(res => res.data)
}
const updatePerson =( id, personObject) => {
    const kysely = axios.put(`${pUrl}/${id}`, personObject)
    return kysely.then(res => res.data)
}
const exportti = {
    getPersons: getPersons,
    addPerson: addPerson,
    deletePerson: deletePerson,
    updatePerson: updatePerson,
}

export default exportti