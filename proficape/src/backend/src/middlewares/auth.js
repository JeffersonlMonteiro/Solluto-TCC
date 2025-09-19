const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = async (req, res, next) => {
const authHeader = req.header('Authorization');
if(!authHeader) return res.status(401).json({ error : 'Nenhum token fornecido'});

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Formato do token inválido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.USU_INT_ID = decoded.USU_INT_ID;
    next();
  } catch (err) {
    if(err.name === 'TokenExpiredError'){
      return res.status(401).json({ error: 'Token Expirado'});
        }
    res.status(400).json({ error: 'Token inválido' });
  }
};