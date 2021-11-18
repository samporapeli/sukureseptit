const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RecipeBook extends Model {}
  RecipeBook.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'RecipeBook',
  })
  return RecipeBook
}