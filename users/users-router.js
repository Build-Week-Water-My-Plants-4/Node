const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (request, response) => {
  Users.find()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ errorMessage: "Failed to retrieve users" });
    });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  Users.findById(id)
    .then(user => {
      response.status(200).json(user);
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ errorMessage: "Failed to retrieve user by ID" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  Users.update(id, updatedUser)
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(500).json({ message: "Could not update that user" });
      }
    })
    .catch(error => {
      console.log("update user error", error);
      res.status(500).json({ message: "There was an error updating user" });
    });
});

module.exports = router;
