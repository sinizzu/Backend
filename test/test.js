const jwt = require('jsonwebtoken');

const payload = {
  uid: 'user-unique-id',
  name: 'John Doe',
  email: 'john.doe@example.com'
};

const secretKey = 'your-secret-key';

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log(token);



//////


const jwt = require('jsonwebtoken');

const token = req.headers.authorization.split(' ')[1]; // Authorization 헤더에서 토큰 추출

try {
  const decoded = jwt.verify(token, 'your-secret-key');
  console.log(decoded); // 디코딩된 페이로드 (uid 포함)
  const uid = decoded.uid;
  // uid를 사용하여 RDS에서 사용자 정보 조회 및 처리
} catch (error) {
  console.error('Token verification failed:', error);
  res.status(401).send('Unauthorized');
}
