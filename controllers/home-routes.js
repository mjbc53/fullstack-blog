const router = require('express').Router()
const seqeulize = require('../config/connection')
const {Post, Comment, User} = require('../models')

//get all posts for home page to render them
router.get('/', (req, res) => {
  Post.findAll({
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
  .then( dbPostData => {
    const posts = dbPostData.map(post => post.get({plain: true}))
    res.render('homepage', {posts, loggedIn: req.session.loggedIn})
  })
  .catch( err => {
    console.log(err)
    res.status(500).json(err)
  })
})

//render login page
router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/')
    return
  }

  res.render('login')
})

//get post by id and render single-post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
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
        model: Comment,
        attributes: ['id', 'comment_content', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then( dbPostData => {
    if(!dbPostData){
      res.status(404).json({ message: 'No post found with this id'})
      return
    }

    const post = dbPostData.get({plain: true})
    res.render('single-post', {post, loggedIn: req.session.loggedIn})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})


module.exports = router