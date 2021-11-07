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

  const ingredients = [
    {
      amount: 1,
      unit: 'ripaus',
      name: 'suolaa',
    },
    {
      amount: 7,
      unit: 'dl',
      name: 'vettä',
    },
  ]

  const recipes = [
    {
      name: 'Ruutin linssikeitto',
      instructions: 'Sample instructions for lentil soup',
      mealType: 'pääruoka',
      cookingTime: 60,
      originalAuthor: 'Ruuti Rautiainen',
      picture: null,
      portions: 6,
    },
  ]

  userData.forEach(data =>
    db.User.create({ ...data })
  )

  ingredients.forEach(data =>
    db.Ingredient.create({ ...data })  
  )

  recipes.forEach(data =>
    db.Recipe.create({ ...data })  
  )

  const lentilsoup = (await db.Recipe.findAll())[0]
  await lentilsoup.setIngredients(await db.Ingredient.findAll())
  await lentilsoup.save()
}

fake()
