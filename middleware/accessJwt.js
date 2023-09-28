const jwt = require("jsonwebtoken");

 function generateaccessJWT(userId,roleId) {
  let jwtSecretKey = `${process.env.JWT_SECRET}`;
  return jwt.sign({userId,roleId}, jwtSecretKey, {
    expiresIn: "15m",
  });
}



module.exports = generateaccessJWT;
