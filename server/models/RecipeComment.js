const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RecipeComment extends Model {}
  RecipeComment.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'RecipeComment',
  })
  return RecipeComment
}