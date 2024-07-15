const bcrypt = require('bcrypt');
const connection = require('../config/dbConfig');

exports.createUser = async ({ username, password, email }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (user_id, pass_wd, email, name) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, hashedPassword, email], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve({ id: results.insertId, username, email });
    });
  });
};

exports.authenticateUser = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    connection.query(query, [username], async (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};
