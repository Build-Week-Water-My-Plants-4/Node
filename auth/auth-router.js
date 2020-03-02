const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const { jwtSecret } = require("../config/secrets.js");

router.post("/register", (request, response) => {
  let user = request.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      response.status(201).json(saved);
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ errorMessage: "Failed to register user to the database" });
    });
});

router.post("/login", (request, response) => {
  let { username, password } = request.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        response.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        console.log(request.body);
        response.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ errorMessage: "Failed to log in user" });
    });
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    number: user.phone_number
  };
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
