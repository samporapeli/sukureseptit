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
          (await db.Recipe.findAll({ include: db.Ingredient }))
        ]
      }
    ]
  })
})

router.get('/family', async (req, res) => {
  res.json({
    members: (await db.User.findAll()).map(m => m.toJson())
  })
})

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

router.get('/recipe/:id', async (req, res) => {
  res.json({
    recipe: (await db.Recipe.findOne({
      where: { id: req.params.id },
      include: [db.Ingredient, db.RecipeComment],
    }))
  })
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