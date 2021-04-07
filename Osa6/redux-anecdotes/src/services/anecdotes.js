import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const ret = await axios.get(baseUrl)
    return ret.data
}
const createNew = async (content) => {
    const ret = await axios.post(baseUrl, { content, votes: 0 })
    return ret.data
}
const update = async (anec) => {
    const ret = await axios.put(`${baseUrl}/${anec.id}`, anec)
    return ret.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, update }