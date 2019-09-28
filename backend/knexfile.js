module.exports = {

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: 'src/database/migrations'
    },
    seeds: {
      directory: 'src/database/seeds'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'hf_db',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'src/database/migrations'
    },
    seeds: {
      directory: 'src/database/seeds'
    }
  }

};
