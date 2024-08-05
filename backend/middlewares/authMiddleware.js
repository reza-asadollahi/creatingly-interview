const { getUserById } = require('../models/user');

function authMiddleware(req, res, next) {
  const userId = req.header('userId');
  const user = getUserById(userId)
  if (!userId || !user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = { userId };
  next();
}

module.exports = { authMiddleware };
