const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  if (!req.headers["authorization"]) return res.status(401).send({ message: "Unauthorized" });
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return res.send({ message });
    }
   // console.log(decoded)
    req.user = decoded; // Assign the decoded to req.user
    
    next();
  });
};

module.exports = authMiddleware;




// const jwt = require("jsonwebtoken");

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authorizationHeader = req.headers["authorization"];

//     // Check if the "authorization" header exists
//     if (!authorizationHeader) {
//       return res.status(401).json({
//         message: "Authentication failed: No token provided",
//         success: false,
//       });
//     }

//     const token = authorizationHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({
//           message: "Authentication failed: Invalid token",
//           success: false,
//         });
//       } else {
//         req.user= decoded;
//         next();
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Authentication failed: Internal server error",
//       success: false,
//     });
//   }
// };

// module.exports = authMiddleware;

