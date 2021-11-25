import axios from 'axios'
import config from '../config'

const baseUrl = config.apiBaseUrl + '/api/v1/accounts'

const token = () => {
  return window.localStorage.getItem('sukuresepti_token')
}

const authHeader = () => {
  return {
    headers: { Authorization: `Bearer ${ token() }` }
  }
}

const login = async (credentials) => {
  try {
    return await axios.post(`${baseUrl}/login`, credentials)
  } catch (e) {
    alert(e)
  }
}

const fetchUser = async () => {
  if (!token()) throw 'No token available'
  try {
    return await axios.get(`${baseUrl}/user`, authHeader())
  } catch (e) {
    return e
  }
}

const register = async (userInformation) => {
  try {
    return await axios.post(`${baseUrl}/register`, userInformation)
  } catch (e) {
    return e
  }
}

export default {
  login,
  fetchUser,
  authHeader,
  register,
}