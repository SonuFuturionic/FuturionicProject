// db.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('newdata', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres', // Use the correct dialect for PostgreSQL
});

module.exports = sequelize;