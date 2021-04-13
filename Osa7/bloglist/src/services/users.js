import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
    const ret = await axios.get(baseUrl)
    return ret.data
}
const getOne = async (id) => {
    const ret = await axios.get(baseUrl)
    return ret.data.find(u => u.id === id)
}
const exportit = {
    getAll,
    getOne
}
export default exportit