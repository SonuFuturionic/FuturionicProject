
const express = require('express');

const router = require('./routes/router');
const client = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;


  

app.use(express.json());
app.use('/api/users',router)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
