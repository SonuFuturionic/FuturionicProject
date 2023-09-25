const express = require("express");
const createUser = require("../controller/user");


//router onject
const router = express.Router();

//routes

router.post('/create',createUser)

module.exports = router;
