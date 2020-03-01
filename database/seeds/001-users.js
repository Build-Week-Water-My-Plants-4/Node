exports.seed = function(knex) {
  return knex("users").insert([
    {
      id: 1,
      username: "Kenneth",
      password: "Beats",
      phone_number: 1234
    },
    {
      id: 2,
      username: "dzcurry",
      password: "rickyricky",
      phone_number: 1233
    },
    {
      id: 3,
      username: "Flowerboy",
      password: "goblin",
      phone_number: 1232
    },
    {
      id: 4,
      username: "Kota",
      password: "colorado",
      phone_number: 1231
    }
  ]);
};
