const express = require('express');

const Posts = require('../data/helpers/postDb.js');

const router = express.Router();

// GET /api/posts
// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

// GET /api/posts/:id
// Get a post by id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Posts.getById(id)
    .then(posts => {
        if (!posts) {
            res.status(500).json({message: 'The post with the specified ID does not exist.'});
        } else {
            res.status(200).json(posts);
        }
    }).catch(error => {
        res.status(404).json({message: 'The post information could not be retrieved.'});
    })
});

// POST /api/posts
// Add a post
router.post('/', (req, res) => {
    const postInfo = req.body;
    console.log('user information', postInfo);
  
    Posts.insert(postInfo).then(posts => {
        if( !postInfo.text || !postInfo.user_id) {
            res.status(400).json({message: 'Please provide the text and user id for the post.'});
        } else {
            res.status(201).json(posts);
        }
    })
    .catch(error => {
        res.status(500).json({message: 'There was an error while saving the post to the database'});
    })
});

// DELETE /api/posts/:id
// Delete a post by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.remove(id).then(deleted => {
        if (!deleted) {
            res.status(500).json({message: 'The post with the specified ID does not exist.'});
        } else {
            res.status(204).end();
        }
    })
    .catch(error => {
        res.status(500).json({message: 'The post could not be removed'});
    })
});

// PUT /api/posts/:id
// Update a post by id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
  
    Posts.update(id, changes).then(updated => {
        if (!id) {
            res.status(500).json({message: 'The post with the specified ID does not exist.'});
        } else if (!changes.text || !changes.user_id) {
            res.status(400).json({message: 'Please provide the name and user_id for the post.'});
        } else if(updated) {
            res.status(200).json(changes);
        } else {
            res.status(404).json({message: 'post not found'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'The post information could not be modified.'});
    })
  });


module.exports = router;