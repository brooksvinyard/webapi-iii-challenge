const express = require('express');

const Users = require('../data/helpers/userDb.js');

const router = express.Router();

// GET /api/users
// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  }
});


// GET /api/users/:id
// Get a user by id

// POST /api/users
// Add a user

// DELETE /api/users/:id
// Delete a user by id

// PUT /api/users/:id
// Update a user by id

module.exports = router;