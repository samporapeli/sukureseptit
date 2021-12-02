import axios from 'axios'
import config from '../config'
import loginService from './login'

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

const addRecipeBook = async (newBook) => {
  return await axios.post(`${baseUrl}/api/v1/book`, newBook)
}

const books = async () => {
  return await axios.get(`${baseUrl}/api/v1/books`)
}

const addComment = async (newComment) => {
  // TODO: change url to format [...]/book/${bookID}/recipe/${recipeID}/comment
  return await axios.post(`${baseUrl}/api/v1/book`, newComment, loginService.authHeader())
}

const addRecipe = async (bookID, newRecipe) => {
  return await axios.post(`${baseUrl}/api/v1/book/${bookID}/recipe`, newRecipe)
}

const joinToBook = async (bookID) => {
  try {
    return await axios
      .post(`${baseUrl}/api/v1/book/${bookID}/join`,
        {},
        loginService.authHeader()
      )
  } catch (e) {
    return e
  }
}

export default {
  addRecipeBook,
  recipes,
  recipe,
  family,
  books,
  addComment,
  addRecipe,
  joinToBook,
}