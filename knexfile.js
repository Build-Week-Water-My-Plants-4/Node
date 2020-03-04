// Update with your config settings.
require("dotenv").config();

module.exports = {
  // development: {
  //   client: "sqlite3",
  //   useNullAsDefault: true,
  //   connection: {
  //     filename: "./database/wmp_table.db3"
  //   },
  //   migrations: {
  //     directory: "./database/migrations"
  //   },
  //   seeds: {
  //     directory: "./database/seeds"
  //   },
  //   testing: {
  //     client: "sqlite3",
  //     connection: {
  //       filename: "./database/test.db3"
  //     }
  //   }
  // },
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/wmp_table.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  staging: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 6000,
      user: "postgres",
      password: process.env.LOCAL_PASSWORD,
      database: "users"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
