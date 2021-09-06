//import express
const express = require('express');
// instantiate express
const app = express();

// Require cors and use it
const cors = require('cors');
app.use(cors());

// Middleware to parse HTTP data request body and add body property to the request object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/posts');
});

//controllers
const postsController = require('./controllers/posts');
app.use('/posts/', postsController);

const usersController = require('./controllers/users');
app.use('/users/', usersController);
const filterController = require('./controllers/filter')
app.use('/filter/', filterController);

//status code
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).send(message);
});

//listen on port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});