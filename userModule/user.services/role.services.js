const errorMessages = require('../../userModule/user.constant/constantError');
const Role = require("../model/role.model/Role");
const User = require('../model/user.model/user');


// create role service
const createRole = async (userbody) => {
    return Role.create(userbody);
  };



// get role service
const getRole = async () => {
    const role = await Role.findAll(({ 
      include: [
         User
      ] 
    }));
    return role;
  };
  
  
  // get role by id service
  const getRoleById = async (id) => {
    const role = await Role.findByPk(id);
    return role;
  };




// update role by id service
const updateRoleById = async (id, updateBody) => {
    const role = await getRoleById(id);
    if (!role) {
      return errorMessages.NOT_FOUND;
    }
    Object.assign(role, updateBody);
    await role.save();
    return role;
  };



  module.exports = {createRole,getRole,getRoleById,updateRoleById}