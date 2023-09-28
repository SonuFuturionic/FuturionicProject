const jwt = require("jsonwebtoken");

 function generaterefreshJWT(userId,roleId) {
  let jwtSecretKey = `${process.env.JWT_SECRET}`;
  return jwt.sign({userId,roleId}, jwtSecretKey, {
    expiresIn: "1d",
  });
}



module.exports = generaterefreshJWT;
