import knex from 'knex';

const connection = knex({
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
});

export default connection;
