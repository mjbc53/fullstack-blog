const router = require('express').Router()
const { User, Post, Comment } = require('../../models')

//get all users
router.get('/', (req, res) => {
  User.findAll( {
    attributes: { exclude: ['password']}
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

//get user by id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password']},
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: [ 'id', 'title', 'post_content', 'created_at' ]
      },
      {
        model: Comment,
        attributes: [ 'id', 'comment_content', 'post_id']
      }
    ]
  })
  .then( dbUserData => {
    if(!dbUserData){
      res.status(404).json( { message: 'No user found with that id'})
      return
    }
    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})


//create user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(dbUserData => {
    req.session.save( () => {
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      req.session.loggedIn = true

      res.json(dbUserData)
    })
  })
  .catch( err => {
    console.log(err)
    res.status(500).json(err)
  })
})

//Update user by id
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData){
      res.status(404).json({ message: 'No user found with that id'})
      return
    }

    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})


// Delete user by id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData){
      res.status(404).json({ message: 'No user found with that id'})
      return
    }
    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})


//login request
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then( dbUserData => {
    if(!dbUserData){
      res.status(400).json( { message: 'No user with that username'})
      return
    }

    const validatePassword = dbUserData.checkPassword(req.body.password)
    if(!validatePassword){
      res.status(400).json({ message: 'Incorrect password'})
      return
    }

    req.session.save( () => {
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      req.session.loggedIn = true

      res.json({ user: dbUserData, message: 'You are now logged in'})
    })

  })
})


//logout request
router.post('/logout', (req, res) => {
  if(req.session.loggedIn){
    req.session.destroy( () => {
      res.status(204).end()
    })
  }
  else {
    res.status(404).end()
  }
})

module.exports = router