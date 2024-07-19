const jwt = require('jsonwebtoken');
const handleError = require('../utils/handleError');
const axios = require('axios');
const { PROXY_ADDR2 } = require('../config/proxyConfig');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const response = await axios.get(`${PROXY_ADDR2}/auth/ping`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // 상태 코드가 204인 경우
    if (response.status === 204) {
      return next();
    }

    // 상태 코드가 204가 아닌 경우 에러 응답 반환
    return res.status(401).json({ message: 'Unauthorized' });
  
  } catch (error) {
    handleError.handleError(error, res);
  } 
};

module.exports = authenticateToken;
