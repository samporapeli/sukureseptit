const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.get('/book/:bookID/recipes', async (req, res) => {
  res.json({
    books: await db.RecipeBook.findOne({
      where: {
        id: req.params.bookID
      }},
      {
        include: [db.Recipe]
      })
  })
})

router.get('/recipes', async (req, res) => {
  res.json({
    books: await req.user.getRecipeBooks({ include: [db.Recipe] })
  })
})

router.get('/book/:bookID', async (req, res) => {
  res.json(
    await db.RecipeBook.findOne({
      where: { id: req.params.bookID },
      include: [{ model: db.Recipe, include: [db.Ingredient] }],
    })
  )
})

router.post('/book', async (req, res) => {
  try {
    const name = req.body.familyName
    const description = req.body.description
    if (!(name && description)) throw 'parameters missing'
    const newBook = await db.RecipeBook.create({
      familyName: name,
      description,
    })
    res.json({
      status: 'OK',
      newBook,
    })
    await newBook.addUser(req.user)
  } catch (e) {
    const status = e === 'parameters missing' ? 400 : 500
    res.status(status).json({
      status: 'error',
      error: e,
    })
  }
})

router.post('/book/:bookID/join', async (req, res) => {
  try {
    if (!req.user) throw 'Authentication error'
    const book = await db.RecipeBook.findOne({
      where: { id: req.params.bookID }
    })
    if (!book) throw 'No book found'
    await book.addUser(req.user)
    res.json({
      status: 'OK',
    })
  } catch (e) {
    console.log(e)
    const status =
      (e === 'No book found' || e === 'Authentication error')
      ? 400
      : 500
    res.status(status).json({
      status: 'error',
      error: e,
    })
  }
})

router.post('/book/:bookID/recipe', async (req, res) => {
  try {
    const newRecipe = await
      (await db.RecipeBook.findOne({
        where: { id: req.params.bookID }
      })).createRecipe({
        ...req.body,
        originalAuthor: req.user.firstName + ' ' + req.user.lastName
      })
    req.body.ingredients.forEach(ingr => {
      newRecipe.createIngredient({
        ...ingr
      })
    })
    res.json({
      status: 'OK',
      created: newRecipe,
    })
  } catch {
    res.status(500).json({
      status: 'error',
      error: 'Internal server error',
    })
  }
})

router.get('/book/:bookID/recipe/:id', async (req, res) => {
  res.json({
    recipe: (await db.Recipe.findOne({
      where: { id: req.params.id },
      include: [db.Ingredient, {
        model: db.RecipeComment,
        include: db.User.scope('basic'),
      }],
    }))
  })
})

router.post('/book/:bookID/recipe/:id/comment', async (req, res) => {
  try {
    if (!req.user) throw 'Authentication error'
    const newComment = await (await db.Recipe.findOne({
      where: { id: req.params.id } 
    })).createRecipeComment({
      comment: req.body.comment,
      picture: null,
    })
    await newComment.setUser(req.user)
    res.json({
      status: 'OK',
      created: newComment,
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
})

router.get('/book/:bookID/members', async (req, res) => {
  res.json({
    members: (await (await db.RecipeBook.findOne({ where: { id: req.params.bookID } })).getUsers()).map(m => m.toJson())
  })
})

router.get('/books', async (req, res) => {
  res.json({
    books: (await req.user.getRecipeBooks({ include: [db.Recipe, db.User] }))
  })
})

module.exports = router