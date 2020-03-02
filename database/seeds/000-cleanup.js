exports.seed = async function(knex) {
  await knex("plants").truncate();
  await knex("frequency").truncate();
  await knex("users").truncate();
};
