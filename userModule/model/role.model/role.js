const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const User = require('../user.model/user')
const Role = sequelize.define('Role', {
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },


});

// Role.hasMany(User, {
//   foreignKey: 'roleId',
//     allowNull: false
  
// });


module.exports = Role;
