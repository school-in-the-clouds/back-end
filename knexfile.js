// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' }, // change this if you want a different name for the database
    useNullAsDefault: true, 
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' },
  },
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations',
    },
  }
};



