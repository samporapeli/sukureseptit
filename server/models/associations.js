const createAssociations = (db) => {
  db.Recipe.hasMany(db.Ingredient)
  db.Ingredient.belongsTo(db.Recipe)

  db.Recipe.hasMany(db.RecipeComment)
  db.RecipeComment.belongsTo(db.Recipe)
  db.User.hasMany(db.RecipeComment)
  db.RecipeComment.belongsTo(db.User)
}

module.exports = createAssociations