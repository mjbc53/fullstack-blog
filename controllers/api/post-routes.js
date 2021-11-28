const router = require('express').Router()
const {User, Post , Comment} = require('../../models')

//Get all posts
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
        attributes: [ 'Username']
      }
    ]
  })
  .then( dbPostData => {
    res.json(dbPostData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

//Get post by id
router.get('/:id', (req, res) => {
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
        model: User,
        attributes: [ 'Username']
      }
    ]
  })
  .then( dbPostData => {
    if(!dbPostData){
      res.status(404).json({ message: 'No post found with that id'})
      return
    }
    res.json(dbPostData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

//Create post
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id
  })
  .then( dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})


//Update post
router.put('/:id', (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if(!dbPostData){
      res.status(404).json({ message: 'No post with that id'})
      return
    }

    res.json(dbPostData)
  })
  .catch( err => {
    console.log(err)
    res.status(500).json(err)
  })
})


//Delete post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then( dbPostData => {
    if(!dbPostData){
      res.status(404).json({ message: 'No post with that id'})
      return
    }
    res.json(dbPostData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})



module.exports = router