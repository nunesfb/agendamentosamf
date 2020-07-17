module.exports = {
    production: {
        client: 'pg',
        debug: true,
        connection: process.env.DATABASE_URL,
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: './src/database/migrations'  // <-- here
        },
        ssl: true
      }
};