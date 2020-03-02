const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
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

function update(id, user) {
  return db("users")
    .where({ id })
    .update(user)
    .then(count => {
      return count > 0 ? this.findById(id) : null;
    });
}
