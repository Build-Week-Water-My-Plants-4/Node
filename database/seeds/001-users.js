exports.seed = function(knex) {
  return knex("users").insert([
    {
      username: "Kenneth",
      password: "Beats",
      phone_number: 123
    },
    {
      username: "dzcurry",
      password: "rickyricky",
      phone_number: 123
    },
    {
      username: "Flowerboy",
      password: "goblin",
      phone_number: 123
    },
    {
      username: "Kota",
      password: "colorado",
      phone_number: 123
    }
  ]);
};
