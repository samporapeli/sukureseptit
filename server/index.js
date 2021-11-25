const express = require('express')
const apiV1 = require('./routes/apiV1')
const accounts = require('./routes/accounts')
const middleware = require('./middleware')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.token)
app.use(middleware.user)
app.use('/api/v1/accounts', accounts)
app.use('/api/v1', apiV1)

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`)
})