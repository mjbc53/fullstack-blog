const router = require('express').Router()
const seqeulize = require('../config/connection')
const {Post, Comment, User} = require('../models')

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
    console.log(posts)
    res.render('homepage', {posts, loggedIn: req.session.loggedIn})
  })
  .catch( err => {
    console.log(err)
    res.status(500).json(err)
  })
})


module.exports = router