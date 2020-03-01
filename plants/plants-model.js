const db = require("../database/dbConfig");

module.exports = {
  findPlantByUID,
  addPlant,
  findFrequency
};

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

function findFrequency(id) {
  return db("frequency_id")
    .join("plants", "frequency.id", "plants.id")
    .where("frequency.id", id);
}

// async function addPlant(plant, id) {
//   const [plant_id] = await db("plants").insert(plant, "user_id");
//   await db("users")
//     .insert({ user_id: id }, (plant_id, plant_id), "plant_id", "username")
//     .then(ids => {
//       const id = ids[0];
//       return findById(id);
//     });
//   return findById(plant_id);
// }

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
