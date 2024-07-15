const express = require('express');
// const session = require('express-session');
const authRoutes = require('./routes/auth_routes'); // auth 관련 import
const unauthRoutes = require('./routes/unauth_routes'); // auth 관련 import
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/unauth', unauthRoutes);

const PORT = process.env.PORT || 8000;



app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

});
