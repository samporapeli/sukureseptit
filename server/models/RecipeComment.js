const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RecipeComment extends Model {}
  RecipeComment.init({
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