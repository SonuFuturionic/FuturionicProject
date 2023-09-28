// user.services.js
const User = require("../model/user.model/user");
const errorMessages = require('../../userModule/user.constant/constantError');
const Role = require("../model/role.model/Role");



// create user service
const createUser = async (userbody) => {
  return User.create(userbody);
};


// get user service
const getUser = async () => {
  const users = await User.findAll({ 
    include: [
       Role
    ] 
  });
  return users;
};


// get user by id service
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};


// update user by id service
const updateUserById = async (id, updateBody) => {
  const user = await getUserById(id);
  if (!user) {
    return errorMessages.NOT_FOUND;
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};


// delete user by id service
const deleteUserById = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    return errorMessages.NOT_FOUND;
  }
  await user.destroy();
  return user;
};


module.exports = { createUser, getUserById, getUser, updateUserById, deleteUserById };

