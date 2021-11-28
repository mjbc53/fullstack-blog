//import all packages needed for the server file
const express = require('express')
const helpers = require('./utils/helpers')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path  = require('path')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({helpers})
const session =require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)


// require('dotenv').config()

// set up session
const sess = {
  secret: 'Super secret secret',
  cookie: { expires: new Date(Date.now() + 36000000)},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

//set up express and port
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

//set up handlerbars as view engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//use session that was set up
app.use(session(sess))

//use routes
app.use(routes)

//sequalize sync to start the server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, ()=> console.log(`Now listening at http://localhost:${PORT}`))
})