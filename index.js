// app.js
const express = require("express");
const User = require("./userModule/model/user.model/user");
const sequelize = require("./config/sequelize");
const router = require("./userModule/user.routes/router");
//const Role = require('./userModule/model/role.model/role');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });


  
app.use("/api/users", router);

// Define your routes and controllers here
// Example: app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
