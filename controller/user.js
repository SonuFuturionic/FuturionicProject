

const client = require("../config/database");

const createUser = (req, res) => {
    const { username } = req.body;
  
    const query =  'INSERT INTO public.users (username) VALUES ($1) RETURNING *';
    const values = [username];
  
    client.query(query, values)
      .then(result => {
        const newUser = result.rows[0];
        res.status(201).json(newUser);
      })
      .catch(error => {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Unable to create user' });
      });
  };

  module.exports = createUser