exports.seed = function(knex) {
  return knex("plants").insert([
    {
      id: 1,
      nickname: "big ass banana plant",
      species: "",
      frequency: "Once Monthly",
      user_id: 1
    },
    {
      id: 2,
      nickname: "Wheatie",
      species: "MJ",
      frequency: "Once Monthly",
      user_id: 1
    },
    {
      id: 3,
      nickname: "Planty",
      species: "Plant",
      frequency: "Twice Monthly",
      user_id: 2
    },
    {
      id: 4,
      nickname: "Gerald",
      species: "cactus",
      frequency: "Four Times Weekly",
      user_id: 2
    },
    {
      id: 5,
      nickname: "MCCRAIG",
      species: "ROCK",
      frequency: "Four Times Weekly",
      user_id: 3
    },
    {
      id: 6,
      nickname: "Lucy & Co",
      species: "Petunias",
      frequency: "Four Times Weekly",
      user_id: 4
    }
  ]);
};
