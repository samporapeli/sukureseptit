import axios from 'axios'
import config from '../config'

const baseUrl = config.apiBaseUrl

const recipes = async () => {
  const res = await axios.get(`${baseUrl}/api/v1/recipes`)
  return res
}

const recipe = async (bookID, recipeID) => {
  try {
    return await axios.get(`${baseUrl}/api/v1/book/${bookID}/recipe/${recipeID}`)
  } catch (e) {
    return e
  }
}

const family = async () => {
  return await axios.get(`${baseUrl}/api/v1/family`)
}

const books = async () => {
  return await axios.get(`${baseUrl}/api/v1/books`)
}

const addRecipe = async (bookID, newRecipe) => {
  return await axios.post(`${baseUrl}/api/v1/book/${bookID}/recipe`, newRecipe)
}

export default {
  recipes,
  recipe,
  family,
  books,
  addRecipe,
}