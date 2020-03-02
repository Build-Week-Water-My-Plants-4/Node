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

router.get("/:userid/plants", (req, res) => {
  const userid = req.params.userid;
  Users.findUserPlants(userid)
    .then(plants => {
      if (plants) {
        res.status(200).json(plants);
      } else {
        res
          .status(404)
          .json({ message: "There are no plants for that user id." });
      }
    })
    .catch(error => {
      console.log("get plants by user_id error", error);
      res
        .status(500)
        .json({ message: "There was an error getting plants by user_id." });
    });
});

module.exports = router;
