const createAssociations = (db) => {
  db.Recipe.hasMany(db.Ingredient)
  db.Ingredient.belongsTo(db.Recipe)

  db.Recipe.hasMany(db.RecipeComment)
  db.RecipeComment.belongsTo(db.Recipe)
  db.User.hasMany(db.RecipeComment)
  db.RecipeComment.belongsTo(db.User)

  db.RecipeBook.belongsToMany(db.User, { through: 'UsersAndBooks'})
  db.User.belongsToMany(db.RecipeBook, { through: 'UsersAndBooks'})
  db.RecipeBook.hasMany(db.Recipe)
  db.Recipe.belongsTo(db.RecipeBook)
}

module.exports = createAssociations