const express = require('express')
const router = express.Router()
const db = require('../models/index')

router.get('/recipes', async (req, res) => {
  res.json({
    books: [
      {
        id: 'eeeee1',
        family: 'Rautiainen',
        name: 'Rautiaisen suvun keittokirja',
        recipes: [
          (await db.Recipe.findAll({
            include: [db.Ingredient]
          }))
        ]
      }
    ]
  })
})

router.post('/recipe', async (req, res) => {
  try {
    const newRecipe = await db.Recipe.create({
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

router.get('/recipe/:id', async (req, res) => {
  res.json({
    recipe: (await db.Recipe.findOne({
      where: { id: req.params.id },
      include: [db.Ingredient, db.RecipeComment],
    }))
  })
})

router.post('/recipe/:id/comment', async (req, res) => {
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