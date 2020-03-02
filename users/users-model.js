const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUserPlants
};

function find() {
  return db("users")
    .orderBy([{ column: "id" }, { column: "username", order: "desc" }])
    .select("id", "username");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users").insert(user);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first()
    .select("id", "username");
}

function findUserPlants(user_id) {
  return db("users as u")
    .join("plants as p", "u.id", "p.id")
    .where("u.id", user_id);
}
