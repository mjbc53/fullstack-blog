const router = require('express').Router()
const { User, Post, Comment} = require('../../models')

//Get all comments
router.get('/', (req, res) => {
  Comment.findAll()
  .then( dbCommentData => res.json(dbCommentData))
  .catch( err => {
    console.log(err)
    res.status(500).json(err)
  })
})

//Get comment by id
router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if(!dbCommentData){
      res.status(404).json({ message: 'No comment found with this id'})
      return
    }
    res.json(dbCommentData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

//Create a new comment
router.post('/', (req, res) => {
  if(req.session){
    Comment.create({
      comment_content: req.body.comment_content,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
    .then( dbCommentData => res.json(dbCommentData))
    .catch( err => {
      console.log(err)
      res.status(500).json(err)
    })
  }
})

//Update a comment by id
router.put('/:id', (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then( dbCommentData => {
    if(!dbCommentData){
      res.status(404).json({ message: 'No comment found with this id' })
      return
    }
    res.json(dbCommentData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

//Delete a comment by id
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then( dbCommentData => {
    if(!dbCommentData){
      res.status(404).json({ message: 'No comment found with this id' })
      return
    }
    res.json(dbCommentData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

module.exports = router