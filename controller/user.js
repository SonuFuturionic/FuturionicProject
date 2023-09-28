// // routes/users.js
// const express = require('express');
// const router = express.Router();
// const User = require('../model/user');

// // Create a new user
// const createUser = async (req, res) => {
//   try {
//     const { username, email,role } = req.body;
//     const user = await User.create({ username, email ,role});
//     res.status(201).json(user);
//   } catch (error) {
//     // Check if the error is a Sequelize validation error
//     if (error.name === 'SequelizeValidationError') {
//       // Extract validation error messages and send them in the response
//       const validationErrors = error.errors.map((err) => err.message);
//       res.status(400).json({ errors: validationErrors });
//     }
//       if (error.name === 'SequelizeUniqueConstraintError') {
//         const duplicateErrors = error.errors.map((err) => err.message);
//         console.error('Error: Duplicate email address. This email is already in use.');
//         res.status(400).json({ errors: duplicateErrors });
//     } else {
//       // Handle other types of errors
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// };

// module.exports = createUser;

const { errorMessages } = require("../../constant/constantError");
const {
  createUser,
  getUserById,
  getUser
} = require("../../modules/services/user.services");

const create = async (req, res) => {
  try {
    const createdUser = await createUser(req.body);
    res.status(200).json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: "Unable to create user" });
  }
};

const getUserbyId = async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    return res.status(400).send(errorMessages.NOT_FOUND);
  }
  return res.send(user);
};

const getUsers = async (req, res) => {
  const users = await getUser();
  return res.send(users);
};

module.exports = { create, getUserbyId, getUsers };
