const db = require("../database/dbConfig");

module.exports = {
  findAll,
  findByToken,
  findById,
  addPlant,
  remove,
  update
};

function findAll() {
  return db("plants");
}

function findByToken(id) {
  return db("plants")
    .select("id", "nickname", "species", "frequency", "user_id")
    .where("user_id", id);
}

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
