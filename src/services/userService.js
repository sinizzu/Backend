const bcrypt = require('bcrypt');
const connection = require('../config/db_config');

exports.createUser = async ({ userId, passWord, email, name }) => {
  const hashedPassword = await bcrypt.hash(passWord, 10);
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO user_info (user_id, pass_wd, email, name) VALUES (?, ?, ?, ?)';
    connection.query(query, [userId, hashedPassword, email, name], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve({ uid: results.insertId, userId, email });
    });
  });
};

exports.authenticateUser = async ({ userId, passWord }) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user_info WHERE user_id = ?';
    connection.query(query, [userId], async (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      const user = results[0];
      const isMatch = await bcrypt.compare(passWord, user.pass_wd);
      if (isMatch) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};
