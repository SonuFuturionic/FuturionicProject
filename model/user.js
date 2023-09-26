// models/User.js
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
              isEmail: {
                msg: 'Invalid email format',
              },
            },
  },
  role: {
        type: Sequelize.ENUM('user', 'admin', 'developer'), 
        allowNull: false,
        defaultValue: 'user', // Set a default role
      },
});

module.exports = User;