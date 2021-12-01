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

const addRecipeBook = async (newBook) => {
  return await axios.post(`${baseUrl}/api/v1/book`, newBook)
}

const books = async () => {
  return await axios.get(`${baseUrl}/api/v1/books`)
}

export default {
  addRecipeBook,
  recipes,
  family,
  books,
}