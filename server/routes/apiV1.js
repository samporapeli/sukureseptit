const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.get('/book/:bookID/recipes', async (req, res) => {
  res.json({
    books: await db.RecipeBook.findAll({ include: [db.Recipe] })
  })
})

router.get('/recipes', async (req, res) => {
  res.json({
    books: await db.RecipeBook.findAll({ include: [db.Recipe] })
  })
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
    // TODO: associate user with book
  } catch (e) {
    const status = e === 'parameters missing' ? 400 : 500
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
        ...req.body
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
      include: [db.Ingredient, db.RecipeComment],
    }))
  })
})

router.post('/book/:bookID/recipe/:id/comment', async (req, res) => {
  try {
    console.log(req.body)
    const newComment = await (await db.Recipe.findOne({
      where: { id: req.params.id } 
    })).createRecipeComment({
      comment: req.body.comment,
      picture: null,
    })
    // TODO: associate user with the comment
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

router.get('/family', async (req, res) => {
  res.json({
    members: (await db.User.findAll()).map(m => m.toJson())
  })
})

router.get('/books', async (req, res) => {
  res.json({
    books: (await db.RecipeBook.findAll({ include: [db.Recipe, db.User] }))
  })
})

module.exports = router