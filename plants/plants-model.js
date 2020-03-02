const db = require("../database/dbConfig");

module.exports = {
  findPlants,
  findPlantByUID,
  findById,
  addPlant,
  findFrequency,
  addFrequency,
  remove,
  update
};

function findPlants() {
  return db("plants");
}

async function findPlantByUID(id) {
  await db("users")
    .join("plants", "users.id", "plants.id")
    .where("plants.id", id)
    .join("frequency", "plants.id", "freqency.id")
    .select(
      "plants.id",
      "plants.nickname",
      "plants.species",
      "frequency.amount",
      "frequency.time"
    );
}

function findById(id) {
  return db("plants")
    .where({ id })
    .first();
}

function findFrequency(id) {
  return db("frequency_id")
    .join("plants", "frequency.id", "plants.id")
    .where("frequency.id", id);
}

async function addPlant(plant, id) {
  plant.user_id = id;
  return db("plants")
    .insert(plant)
    .select("plant_id", "nickname", "species");
}

function addFrequency(frequency, plantId) {
  frequency.plant_id = plantId;
  return db("frequency").insert(frequency);
}

function remove(id) {
  return db("plants")
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
