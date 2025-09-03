const express = require('express');
const router = express.Router();
const { Pedido } = require('../models');
const authMiddleware = require('../middlewares/auth');
const { Sequelize } = require('sequelize');

router.get('/', authMiddleware, async (req, res) => {
  const total = await Pedido.sum('PED_DECIMAL_TOTAL') || 0;
  res.json({ totalVendas: total });
});

module.exports = router;