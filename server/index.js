const express = require('express')
const apiV1 = require('./routes/apiV1')

const PORT = process.env.PORT || 3001

const app = express()

app.use('/api/v1', apiV1)

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`)
})