const db = require('./models/index')

const fake = async () => {
  await db.sequelize.sync()
  const userData = [
    {
      firstName: 'Kaisa',
      lastName: 'Rautiainen',
    },
    {
      firstName: 'Helena',
      lastName: 'Rautiainen',
    },
    {
      firstName: 'Anton',
      lastName: 'Rautiainen',
    },
  ]
  userData.forEach(data =>
    db.User.create({ ...data })
  )
  console.log(await db.User.findAll())
}

fake()
