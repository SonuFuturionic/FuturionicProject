// User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const Role = require('../role.model/Role'); // Adjust the import path if necessary

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
     references: {
  model: {
    tableName: "Role",
  },
  key: "id",
},
   },
   refreshToken: {
    type: DataTypes.STRING,
  },
});


// Define the association
User.belongsTo(Role, {
  foreignKey: 'roleId', // This foreign key links the User model to the Role model
});


module.exports = User;



// // User.js
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../../../config/sequelize');
// const Role = require('../role.model/Role'); // Adjust the import path if necessary

// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true,
//     },
//   },
//   token: {
//     type: DataTypes.STRING,
//   },
// });

// // Define the association
// User.belongsTo(Role, {
//   foreignKey: 'roleId', // This foreign key links the User model to the Role model
// });

// module.exports = User;

