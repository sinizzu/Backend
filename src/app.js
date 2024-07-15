const express = require('express');
// const session = require('express-session');
const authRoutes = require('./routes/authRoutes'); // auth 관련 import
const connection = require('./config/dbConfig');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;



app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

});
