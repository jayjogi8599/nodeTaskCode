const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};
