//import model and datatypes from sequelize
const {Model, DataTypes} = require('sequelize')
//import database connection
const sequelize = require('../config/connection')
//import bycrypt to compare passwords
const bycrypt = require('bcrypt')



//create User model
class User extends Model {
  //instance to compare passwords when loggin
  checkPassword(loginPW){
    return bycrypt.compareSync(loginPW, this.password)
  }
}

User.init(
  {
    //define id 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    //define username
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    //define password
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        len: [2]
      }
    },

  },
  {
    //define hooks
    //beforeCreate makes sure to hash the password before creating a new user
    //beforeUpdate makes sure to hash the password before a user is updated
    hooks: {
      async beforeCreate(newUserData){
        newUserData.password = await bycrypt.hash(newUserData.password, 10)
        return newUserData
      },
      async beforeUpdate(updatedUserData){
        updatedUserData.password = await bycrypt.hash(updatedUserData.password, 10)
        return updatedUserData
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
)

module.exports = User