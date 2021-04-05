import axios from 'axios'

const baseUrl = '/api/login'

const login = async (usrPwd) => {
    const vastaus = await axios.post(baseUrl, usrPwd)
    return vastaus.data
}
const exportit = {
    login
}
export default exportit