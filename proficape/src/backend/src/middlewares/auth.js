const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acesso negado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.USU_INT_ID = decoded.USU_INT_ID;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' });
  }
};