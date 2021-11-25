const jwt = require('jsonwebtoken')
const db = require('./models/index')
const config = require('./config')

const token = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer '))
    req.token = authorization.substring('Bearer '.length)
  else
    req.token = null

  next()
}

const user = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, config.secret)
    req.user = await db.User.findOne({ where: {
      id: decodedToken.id,
    } })
  } catch (e) {
    req.user = null
  }

  next()
}

module.exports = {
  token,
  user,
}