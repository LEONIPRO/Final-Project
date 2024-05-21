const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
     database: 'pgadmin4', // Replace 'your-database' with your actual database name
    password: '1234',      // Ensure the password matches your PostgreSQL setup
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;
