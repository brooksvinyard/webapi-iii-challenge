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
router.get('/:id', (req, res) => {
  const {id} = req.params;
  Users.getById(id)
  .then(users => {
      if (!users) {
          res.status(500).json({message: 'The user with the specified ID does not exist.'});
      } else {
          res.status(200).json(users);
      }
  }).catch(error => {
      res.status(404).json({message: 'The user information could not be retrieved.'});
  })
});

// POST /api/users
// Add a user
router.post('/', (req, res) => {
  const userInfo = req.body;
  console.log('user information', userInfo);

  Users.insert(userInfo).then(users => {
      if( !userInfo.name ) {
          res.status(400).json({message: 'Please provide the name for the user.'});
      } else {
          res.status(201).json(users);
      }
  })
  .catch(error => {
      res.status(500).json({message: 'There was an error while saving the user to the database'});
  })
});

// DELETE /api/users/:id
// Delete a user by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Users.remove(id).then(deleted => {
      if (!deleted) {
          res.status(500).json({message: 'The user with the specified ID does not exist.'});
      } else {
          res.status(204).end();
      }
  })
  .catch(error => {
      res.status(500).json({message: 'The user could not be removed'});
  })
});

// PUT /api/users/:id
// Update a user by id
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  Users.update(id, changes).then(updated => {
      if (!id) {
          res.status(500).json({message: 'The user with the specified ID does not exist.'});
      } else if (!changes.name ) {
          res.status(400).json({message: 'Please provide the name for the user.'});
      } else if(updated) {
          res.status(200).json(changes);
      } else {
          res.status(404).json({message: 'user not found'});
      }
  })
  .catch(error => {
      res.status(500).json({message: 'The user information could not be modified.'});
  })
});

module.exports = router;