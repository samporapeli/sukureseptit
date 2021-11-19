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

module.exports = router