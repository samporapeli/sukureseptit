import axios from 'axios'
import config from '../config'

const baseUrl = config.apiBaseUrl

const recipes = async () => {
  const res = await axios.get(`${baseUrl}/api/v1/recipes`)
  return res
}

const family = async () => {
  return await axios.get(`${baseUrl}/api/v1/family`)
}

export default {
  recipes,
  family,
}