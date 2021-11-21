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
    comment_content: {
      type: DataTypes.STRING(500),
      allowNull: false
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