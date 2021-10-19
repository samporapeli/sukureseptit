const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

app.get('/api/v1/', (req, res) => {
  res.json({ message: 'Hello, World!' })
})

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`)
})
