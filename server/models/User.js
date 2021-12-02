const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJson() {
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
      }
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
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
    scopes: {
      basic: {
        attributes: { exclude: ['passwordHash', 'email', 'createdAt', 'updatedAt'] },
      },
    },
    sequelize,
    modelName: 'User',
  })
  return User
}