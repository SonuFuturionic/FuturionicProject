
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'newUser',
    password: '123456789',
    port: 5432,
  });
  
  client.connect()
    .then(() => {
      console.log('Database connected');
    })
    .catch(err => {
      console.error('Error connecting to the database:', err);
    });

module.exports= client