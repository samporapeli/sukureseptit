import axios from 'axios'
import config from '../config'
import loginService from './login'

const baseUrl = config.apiBaseUrl

const recipes = async () => {
  const res = await axios.get(`${baseUrl}/api/v1/recipes`, loginService.authHeader())
  return res
}

const recipe = async (bookID, recipeID) => {
  try {
    return await axios.get(`${baseUrl}/api/v1/book/${bookID}/recipe/${recipeID}`)
  } catch (e) {
    return e
  }
}

const family = async (bookID) => {
  return await axios.get(`${baseUrl}/api/v1/book/${bookID}/members`)
}

const addRecipeBook = async (newBook) => {
  return await axios.post(`${baseUrl}/api/v1/book`, newBook, loginService.authHeader())
}

const book = async (bookID) => {
  return await axios.get(`${baseUrl}/api/v1/book/${bookID}`)
}

const books = async () => {
  return await axios.get(`${baseUrl}/api/v1/books`, loginService.authHeader())
}

const addComment = async (commentData, recipeID, bookID) => {
  return await axios.post(`${baseUrl}/api/v1/book/${bookID}/recipe/${recipeID}/comment`, { comment: commentData }, loginService.authHeader())
}

const addRecipe = async (bookID, newRecipe) => {
  return await axios.post(`${baseUrl}/api/v1/book/${bookID}/recipe`, newRecipe, loginService.authHeader())
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
  book,
  addComment,
  addRecipe,
  joinToBook,
}