const generateaccessJWT = require("./accessJwt");
const jwt = require("jsonwebtoken");

// Middleware for renewing access tokens
const renewAccessTokenMiddleware = (req, res, next) => {
  const expiredAccessToken = req.headers.authorization;

  if (!expiredAccessToken) {
    return next(); // No expired access token, continue to the route handler
  }

  // Verify the expired access token
  jwt.verify(expiredAccessToken, process.env.secretKey, (err, decoded) => {
    if (err) {
      return next(); // Invalid or expired access token, continue to the route handler
    }

    // Valid access token; check if a refresh token is available
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return next(); // No refresh token, continue to the route handler
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.secretKey, (err, decoded) => {
      if (err) {
        return next(); // Invalid refresh token, continue to the route handler
      }

      // Both access token and refresh token are valid; issue a new access token
      // const newAccessToken = jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn: '15m' });
      const newAccessToken = generateaccessJWT(decoded.id, decoded.roleId);

      // Attach the new access token to the request headers
      req.headers.authorization = newAccessToken;

      // Continue to the route handler with the renewed access token
      next();
    });
  });
};

module.exports = renewAccessTokenMiddleware;
