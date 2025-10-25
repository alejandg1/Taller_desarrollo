const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  // allow public for auth routes
  if (req.path.startsWith('/signup') || req.path.startsWith('/login')) return next();
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'invalid token' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    // optionally verify db matches
    if (req.params && req.params.db && payload.db && req.params.db !== payload.db) {
      return res.status(403).json({ error: 'token not valid for this db' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

module.exports = { authenticate };
