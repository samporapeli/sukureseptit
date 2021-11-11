const createAssociations = (db) => {
  db.Recipe.hasMany(db.Ingredient)
  db.Ingredient.belongsTo(db.Recipe)
}

module.exports = createAssociations