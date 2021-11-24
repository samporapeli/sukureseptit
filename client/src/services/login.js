import axios from 'axios'
import config from '../config'

const baseUrl = config.apiBaseUrl + '/api/v1/accounts'

const login = async (credentials) => {
  try {
    return await axios.post(`${baseUrl}/login`, credentials)
  } catch (e) {
    alert(e)
  }
}

export default {
  login,
}