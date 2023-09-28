const express = require("express");
//const createUser = require("../user.controller/user");
const { create, getUserbyId, getUsers, updateUser, deleteUser, login } = require("../user.controller/user");
const authMiddleware = require("../../middleware/authMiddleware");
const renewAccessTokenMiddleware = require("../../middleware/renewAccessTokenMiddleware ");


//router onject
const router = express.Router();

//routes

router.post("/create", create);

router.post('/login',login)

router.get("/users",authMiddleware,renewAccessTokenMiddleware, getUsers);

router.get("/user/:id",authMiddleware,renewAccessTokenMiddleware,getUserbyId);

router.put("/update/:id",authMiddleware,renewAccessTokenMiddleware,updateUser);

router.delete("/delete/:id",authMiddleware,renewAccessTokenMiddleware,deleteUser);


//smpt email nodeMAILER


module.exports = router;
