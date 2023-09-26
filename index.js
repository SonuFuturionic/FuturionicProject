
// app.js
const express = require('express');
const User = require('./model/user');
const sequelize = require('./config/sequelize');
const router = require('./routes/router');

const app = express();
app.use(express.json());

// Synchronize the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

  app.use('/api/users', router);

// Define your routes and controllers here
// Example: app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});