const express = require('express');

const server = express();

server.use(express.json());

const usersRouter = require('./users/users-router.js');
const postsRouter = require('./posts/posts-router.js');


// Routing
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Users / Posts API</h2>
      <p>Welcome to the Lambda API</p>
      `);
});


  module.exports = server;