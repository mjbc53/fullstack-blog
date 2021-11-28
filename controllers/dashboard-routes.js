const router = require('express').Router()
const sequelize = require('../config/connection')
const {Post, User , Comment} = require('../models')


router.get('/', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'post_content',
      'user_id',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({plain: true}))
    res.render('dashboard', {posts, loggedIn: true})
  })
  .catch( err => {
    console.log(err)
    res.status(500).json(err)
  })
})


router.get('/update/:id', (req, res) => {
  Post.findOne({
    where:{
      id: req.params.id
    }
  })
  .then( dbPostData => {
    if(!dbPostData){
      res.status(404).json({ message: 'No post found with this id'})
      return
    }

    const post = dbPostData.get({plain: true})
    res.render('update-dashboard', {post, loggedIn: req.session.loggedIn})
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
})

module.exports = router