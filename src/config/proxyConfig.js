const path = require('path');
const fs = require('fs');
const https = require('https');
require('dotenv').config();


const CLIENT_CERT = process.env.CLIENT_CERT;
const CLIENT_KEY = process.env.CLIENT_KEY;
const CA_CERT = process.env.CA_CERT;

const httpsAgent = new https.Agent({
  cert: fs.readFileSync(CLIENT_CERT),
  key: fs.readFileSync(CLIENT_KEY),
  ca: fs.readFileSync(CA_CERT),
  rejectUnauthorized: false,
});

const PROXY_ADDR1 = process.env.PROXY_ADDR1;
const PROXY_ADDR2 = process.env.PROXY_ADDR2;


module.exports = {
  httpsAgent,
  PROXY_ADDR1,
  PROXY_ADDR2
};
