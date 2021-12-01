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

const books = async () => {
  return await axios.get(`${baseUrl}/api/v1/books`)
}

const addComment = async (newComment) => {
  return await axios.post(`${baseUrl}/api/v1/book`, newComment)
}

export default {
  recipes,
  family,
  books,
  addComment,
}