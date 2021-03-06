require('dotenv').config()

const config = {
  secret: process.env.SUKURESEPTIT_SECRET,
  port: 3001,
}

if (!config.secret) {
  console.error('Please set env variable SUKURESEPTIT_SECRET')
  console.error('Exiting...')
  process.exit(1)
}

module.exports = config