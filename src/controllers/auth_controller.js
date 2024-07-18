const userService = require('../services/userService');
const { httpsAgent, PROXY_ADDR1, PROXY_ADDR2 } = require('../config/proxyConfig');
const handleError = require('../utils/handleError');
const axios = require('axios');


exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post(
      `${PROXY_ADDR2}/auth/signup`,
      { email, password }
    );

    res.status(response.status).send(response.data); //201, 400, 409(중복)
  } catch (error) {
    handleError.handleError(error, res);
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `${PROXY_ADDR2}/auth/login`,
      { email, password }
    );


    res.status(response.status).send(response.data); //200, 400, 401(unauthorized), accessToken, refreshToken
  } catch (error) {
    handleError.handleError(error, res);
  }
};


exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const response = await axios.post(
      `${PROXY_ADDR2}/auth/refresh`,
      { refreshToken },
      {
        headers: {
          'Authorization': `Bearer ${req.headers['authorization'].split(' ')[1]}`, //authorization: Bearer <Access Token>
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(response.status).send(response.data);  //200, 400, 401(unauthorized), accessToken, refreshToken
  } catch (error) {
    handleError.handleError(error, res);
  }
};



// refreshToken 무효화
exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const response = await axios.post(
      `${PROXY_ADDR2}/auth/logout`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${req.headers['authorization'].split(' ')[1]}` //authorization: Bearer <Access Token>
        },
      }
    );
    res.status(response.status).send(response.data);  //204
  } catch (error) {
    handleError.handleError(error, res);
  }
};