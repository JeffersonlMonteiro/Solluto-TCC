const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo à homepage', userId: req.USU_INT_ID });
});

module.exports = router;