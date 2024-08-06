// require('dotenv').config({ path: '../.env' });
const express = require('express');
// const session = require('express-session');
const authRoutes = require('./routes/auth_routes'); // auth 관련 import
const unauthRoutes = require('./routes/unauth_routes'); // auth 관련 import
const cors = require('cors');
const connectDB = require('./config/mongodb');
const path = require('path');




const PORT = process.env.PORT || 8000;

const MAIN_FRONTEND_URL = process.env.MAIN_FRONTEND_URL;
// const MAIN_BACKEND_URL = process.env.MAIN_BACKEND_URL;
const TEST_FRONTEND_URL = process.env.TEST_FRONTEND_URL;
console.log(MAIN_FRONTEND_URL);

const whitelist = [
  MAIN_FRONTEND_URL,
  // MAIN_BACKEND_URL,
  TEST_FRONTEND_URL,
  'http://localhost:8000',
  'http://localhost:8500',
];



const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};



const app = express();



app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight 요청에 대한 응답 처리


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/unauth', unauthRoutes);



app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../test', 'index.html')); // __dirname은 현재파일이 위치한 디렉토리
});


