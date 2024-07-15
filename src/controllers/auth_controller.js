const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { userId, passWord, email, name } = req.body;
    const user = await userService.createUser({ userId, passWord, email, name });
    res.status(201).json({
      resultCode: 201,
      data: {
        user: { id: user.uid, userId: user.userId, email: user.email }
      }
    })
  } catch (error) {
    res.status(400).json({
      resultCode: 400,
      data: {
        message: error.message
      }
    }
    );
  }
};




exports.login = async (req, res) => {
  try {
    const user = await userService.authenticateUser(req.body);
    if (!user) {
      return res.status(401).json({
        resultCode: 401,
        data: {
          message: 'Invalid credentials'
        }
      });
    }

    const token = jwt.sign({ uid: user.uid, user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      resultCode: 200,
      data: {
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      resultCode: 400,
      data: {
        message: error.message
      }
    });
  }
};
