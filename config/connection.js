//import sequelize
const Sequelize = require('sequelize')

//require dotenv file to connection to the database
require('dotenv').config()

//connect to the database
const sequelize = new Sequelize( 
  process.env.DB_NAME, 
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  })

  //export sequelize
  module.exports = sequelize