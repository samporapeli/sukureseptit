const express = require('express')
const db = require('./models/index')

const PORT = process.env.PORT || 3001

const app = express()

app.get('/api/v1/recipes', async (req, res) => {
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

app.get('/api/v1/family', async (req, res) => {
  res.json({
    members: (await db.User.findAll()).map(m => m.toJson())
  })
})

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`)
})
