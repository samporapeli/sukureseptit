const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
  }, {
    sequelize,
    modelName: 'User',
  })
  return User
}