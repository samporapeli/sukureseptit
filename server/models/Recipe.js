const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {}
  Recipe.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mealType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cookingTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    originalAuthor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Recipe',
  })
  return Recipe
}