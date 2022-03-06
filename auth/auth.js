const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader =
    req.headers.authorization ||
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.status(401).json({ error: 'Null token' });
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    res.locals.user = req.user;
    next();
  });
};

module.exports = authenticateToken;
