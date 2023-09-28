const generateaccessJWT = require("../../middleware/accessJwt");
const generaterefreshJWT = require("../../middleware/refreshJwt");
const Role = require("../model/role.model/Role");
const { errorMessages } = require("../user.constant/constantError");
const { createRole } = require("../user.services/role.services");
const {
  createUser,
  getUserById,
  getUser,
  updateUserById,
  deleteUserById,
} = require("../user.services/user.services");

// Create a user with a role
const create = async (req, res) => {
  try {
    // Create the role
    const createdRole = await createRole(req.body);
    // create different route for the role and define the the role by defaults
    // Create the user and associate it with the role
    const createdUser = await createUser({
      username: req.body.username,
      email: req.body.email,
      token: req.body.token,
      roleId: createdRole.id, // Assign the roleId of the created role to the user
    });

    return res.status(200).json({ user: createdUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.json({ error: "Unable to create user" });
  }
};

// // create user
// const create = async (req, res) => {
//   try {
//     // Create the role and associate it with the user
//     const createdRole = await Role.create({
//       role:req.body.role,
//        // Assign the user's ID to the role's userId field
//     });
//     console.log(createdRole);
//     const createdUser = await createUser(req.body,{roleId:createdRole.id});

//     return res.status(200).json({user: createdUser });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.json({ error: "Unable to create user" });
//   }
// };

// find user by id
const getUserbyId = async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    return res.status(400).send(errorMessages.NOT_FOUND);
  }
  return res.send(user);
};

// find all user
const getUsers = async (req, res) => {
  const users = await getUser();
  return res.send(users);
};

// update user by id
const updateUser = async (req, res) => {
  const user = await updateUserById(req.params.id, req.body);
  if (!user) {
    return res.status(400).send(errorMessages.NOT_FOUND);
  }
  res.send({ user });
};

// delete user by id
const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserById(req.params.id);
    if (!user) {
      return res.status(400).send(errorMessages.NOT_FOUND);
    }
    res.send({ message: "user deleted" });
  } catch (error) {
    console.log(error);
  }
};

// login user

const login = async (req, res) => {
  const user = await getUserById(req.body.id);
  if (!user) {
    return res.status(400).send(errorMessages.NOT_FOUND);
  }
  const accessToken = generateaccessJWT(user.id, user.roleId);
  const refreshToken = generaterefreshJWT(user.id, user.roleId);
  user.refreshToken = refreshToken;
  user.save();
  res.send({ message: "Login Success", user, accessToken });
};

//sessions storage

module.exports = {
  create,
  getUserbyId,
  getUsers,
  updateUser,
  deleteUser,
  login,
};
