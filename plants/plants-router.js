const router = require("express").Router();
const Plants = require("./plants-model");

// Gets the plants for a user ✅
// get plants only belonging to the logged in user
router.get("/", (req, res) => {
  console.log(req.decodedToken);
  // const { id } = req.params;
  const id = req.decodedToken.id;

  Plants.findByToken(id)
    .then(plant => {
      console.log(plant);
      res.status(200).json(plant);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve your plants" });
    });
});

// GET / api / plants ✅
// GET all plants
router.get("/all", (req, res) => {
  Plants.findAll()
    .then(plants => {
      if (plants) {
        res.status(200).json({ plants });
      } else {
        res
          .status(404)
          .json({ message: "There are no plants in the  database." });
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "There was an error retrieving plants." });
    });
});

// GET /api/plants/:id ✅
// get plant by its specific id
router.get("/:id", (req, res) => {
  const plants_id = req.params.id;
  Plants.findById(plants_id)
    .then(plant => {
      if (plant) {
        res.status(200).json({ plant });
      } else {
        res
          .status(404)
          .json({ message: "There is no plant in the database with that id." });
      }
    })
    .catch(error => {
      console.log("get plant by id error", error);
      res
        .status(500)
        .json({ message: "There was an error getting plant by id." });
    });
});

// POST /api/plants/✅
//Create plant from user token
router.post("/", (req, res) => {
  const newPlant = req.body;
  const id = req.decodedToken.id;
  Plants.addPlant(newPlant, id)
    .then(plant => {
      if (plant) {
        res.status(201).json(plant);
      } else {
        res.status(404).json({ message: "Could not add that plant." });
      }
    })
    .catch(error => {
      console.log("add plant error", error);
      res.status(500).json({ message: "There was an error adding plant." });
    });
});

// PUT /api/plants/:id ✅
// Edit plant by ID
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedPlant = req.body;
  Plants.update(id, updatedPlant)
    .then(plant => {
      if (plant) {
        res.status(201).json(plant);
      } else {
        res.status(500).json({ message: "Could not update that plant" });
      }
    })
    .catch(error => {
      console.log("update plant error", error);
      res
        .status(500)
        .json({ message: "There was an error updating plant by id." });
    });
});

// DELETE /api/plants/:id ✅
// Delete plant by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Plants.remove(id)
    .then(count => {
      if (!count) {
        res
          .status(200)
          .json({ message: "The plant was successfully removed." });
      } else {
        res.status(500).json({
          message:
            "The plant could not be removed because it did not exist in the database."
        });
      }
    })
    .catch(error => {
      console.log("delete plant error", error);
      res.status(500).json({ message: "There was an error removing a plant." });
    });
});

module.exports = router;
