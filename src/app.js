require('dotenv').config();
const express = require('express');
// const session = require('express-session');
const authRoutes = require('./routes/auth_routes'); // auth 관련 import
const unauthRoutes = require('./routes/unauth_routes'); // auth 관련 import
const cors = require('cors');



const PORT = process.env.PORT || 8000;

const MAIN_FRONTEND_URL = process.env.MAIN_FRONTEND_URL;
console.log(MAIN_FRONTEND_URL);

const whitelist = [
  MAIN_FRONTEND_URL,
  'http://localhost:8000',
  'http://localhost:8500',
];

// CORS 설정 추가
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET','POST','DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};



const app = express();



app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight 요청에 대한 응답 처리


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/unauth', unauthRoutes);



app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

});



