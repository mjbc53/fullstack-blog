//import model and datatypes from sequelize
const {Model, DataTypes} = require('sequelize')
//import database connection
const sequelize = require('../config/connection')

//create Comment model
class Comment extends Model {}

Comment.init(
  {
    //define id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    //define comment content
    commnet_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //define reference to user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    //define reference to post table
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
)


module.exports = Comment