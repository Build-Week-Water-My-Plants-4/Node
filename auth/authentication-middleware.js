const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSecret, (error, decodedToken) => {
      if (error) {
        response.status(401).json({ message: "Invalid credentials" });
      } else {
        request.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    response.status(401).json({ you: "Please provide valid credentials" });
  }
};
