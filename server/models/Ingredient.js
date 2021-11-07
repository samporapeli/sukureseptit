const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {}
  Ingredient.init({
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Ingredient',
  })
  return Ingredient
}