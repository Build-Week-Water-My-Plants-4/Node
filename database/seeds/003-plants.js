exports.seed = function(knex) {
  return knex("plants").insert([
    {
      id: 1,
      nickname: "big ass banana plant",
      species: "",
      frequency_id: 1,
      user_id: 1
    },
    {
      id: 2,
      nickname: "Wheatie",
      species: "MJ",
      frequency_id: 2,
      user_id: 1
    },
    {
      id: 3,
      nickname: "Planty",
      species: "Plant",
      frequency_id: 3,
      user_id: 2
    },
    {
      id: 4,
      nickname: "Gerald",
      species: "cactus",
      frequency_id: 4,
      user_id: 2
    },
    {
      id: 5,
      nickname: "MCCRAIG",
      species: "ROCK",
      frequency_id: 5,
      user_id: 3
    },
    {
      id: 6,
      nickname: "Lucy & Co",
      species: "Petunias",
      frequency_id: 6,
      user_id: 4
    }
  ]);
};
