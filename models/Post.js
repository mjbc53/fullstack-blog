//import model and datatypes from sequelize
const {Model, DataTypes} = require('sequelize')
//import database connection
const sequelize = require('../config/connection')

//create Post model
class Post extends Model{}

Post.init(
  {
    //define id
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    //define title
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //define post contents
    post_content: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //define reference to user
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
)

module.exports = Post