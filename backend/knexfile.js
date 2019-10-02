require('dotenv').config({
  path: '.env'
})

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
      host: process.env.DB_HOST,
      database: process.env.DB_NAME || 'hf_db',
      user:     process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres'
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
