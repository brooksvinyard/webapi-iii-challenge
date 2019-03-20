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

// POST /api/posts
// Add a post

// DELETE /api/posts/:id
// Delete a post by id

// PUT /api/posts/:id
// Update a post by id



module.exports = router;