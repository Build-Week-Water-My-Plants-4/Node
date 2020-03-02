const db = require("../database/dbConfig");

module.exports = {
  findPlants,
  findPlantByUID,
  findById,
  addPlant,
  remove,
  update
};

function findPlants() {
  return db("plants");
}

async function findPlantByUID(id) {
  await db("plants")
    .join("users")
    .where("users.id", id)
    .select("*");
}

// function findPlantByUID(id) {
//   return db("plants").where("user_id", id);
// }

function findById(id) {
  return db("plants")
    .where({ id })
    .first();
}

async function addPlant(plant, id) {
  plant.user_id = id;
  return db("plants")
    .insert(plant)
    .select("plant_id", "nickname", "species");
}

async function remove(id) {
  await db("plants")
    .where({ id })
    .del();
}

function update(id, plant) {
  return db("plants")
    .where({ id })
    .update(plant)
    .then(count => {
      return count > 0 ? this.findById(id) : null;
    });
}
