const router = require("express").Router();

const Plants = require("./plants-model");

//Gets the plants for a user
router.get("/", (req, res) => {
  console.log(req.decodedtoken);
  const id = req.decodedtoken.id;

  Plants.findPlantByUID(id)
    .then(res => {
      console.log(res.data);
      res.status(200).json(res);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve your plants" });
    });
});

//Creates a new plant for the user
router.post("/:id", (req, res) => {
  const newPlant = req.body;
  const { id } = req.params;
  Plants.addPlant(newPlant, id)
    .then(plant => {
      if (plant) {
        res.status(200).json(plant);
      } else {
        res.status(404).json({ message: "Could not add that plant." });
      }
    })
    .catch(error => {
      console.log("add plant error", error);
      res.status(500).json({ message: "There was an error adding plant." });
    });
});

// //Updates a plant for a user
// router.put();

// //Deletes a plant for a user
// router.delete();

module.exports = router;
