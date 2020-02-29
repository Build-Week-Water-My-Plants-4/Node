exports.seed = function(knex) {
  return knex("frequency").insert([
    {
      id: 1,
      amount: 2,
      time: "week"
    },
    {
      id: 2,
      amount: 5,
      time: "hour"
    },
    {
      id: 3,
      amount: 6,
      time: "month"
    },
    {
      id: 4,
      amount: 2,
      time: "week"
    },
    {
      id: 5,
      amount: 1,
      time: "week"
    },
    {
      id: 6,
      amount: 3,
      time: "day"
    }
  ]);
};
