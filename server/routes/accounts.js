const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const db = require('../models/index')
const config = require('../config')

router.post('/register', async (req, res) => {
  const saltRounds = 10
  try {
    const params = req.body
    if (!(params.email && params.password && params.lastName && params.firstName))
      throw 'Email, password, last and first name required!'
    if ((await db.User.findAll({ where: { email: params.email } })).length > 0)
      throw 'There\'s already a user with that email'    
    const newUser = await db.User.create({
      ...params,
      passwordHash: await bcrypt.hash(params.password, saltRounds)
    })
    res.status(201).json({
      status: 'OK',
      newUser,
    })
  } catch (e) {
    res.status(400).json({
      status: 'error',
      error: e,
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const params = req.body
    if (!(params.email && params.password))
      throw 'email and password required!'
    
    const user = await db.User.findOne({ where: { email: params.email } })
    console.log(params.password, user.passwordHash)
    const passwordCorrect = user 
      ? await bcrypt.compare(params.password, user.passwordHash)
      : false

    const token = jwt.sign({
      email: user.email,
      id: user.id,
    }, config.secret)
    
    if (user && passwordCorrect) res.json({
      status: 'OK',
      user: user,
      token,
    })
    else throw 'username or password incorrect'
  } catch (e) {
    res.status(401).json({
      status: 'error',
      error: e,
    })
  }
})

module.exports = router