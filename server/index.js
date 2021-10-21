const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

app.get('/api/v1/recipes', (req, res) => {
  res.json({
    books: [
      {
        id: 'eeeee1',
        family: 'Rautiainen',
        name: 'Rautiaisen suvun keittokirja',
        recipes: [
          {
            id: 'fffff1234',
            name: 'Ruutin linssikeitto',
            instructions: 'Sample instructions for lentil soup',
            mealType: 'pääruoka',
            cookingTime: 60,
            originalAuthor: 'Ruuti Rautiainen',
            picture: null,
            portions: 6,
          },
        ]
      }
    ]
  })
})

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`)
})
