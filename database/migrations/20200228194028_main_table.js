exports.up = async function(knex) {
  await knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username", 24)
      .unique()
      .notNullable();
    tbl.string("password", 64).notNullable();
    tbl
      .integer("phone_number")
      .notNullable()
      .unique();
  });
  await knex.schema.createTable("frequency", tbl => {
    tbl.increments();
    tbl.integer("amount").notNullable();
    tbl.string("time").notNullable();
  });
  await knex.schema.createTable("plants", tbl => {
    tbl.increments();
    tbl.string("nickname", 128).notNullable();
    tbl.string("species", 128);
    tbl
      .integer("frequency_id")
      .unsigned()
      // .notNullable()
      .references("id")
      .inTable("frequency")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("frequency");
  await knex.schema.dropTableIfExists("plants");
};
