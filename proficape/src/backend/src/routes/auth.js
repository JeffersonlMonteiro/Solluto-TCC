const express = require('express');
const {op} = require('sequelize');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Usuario } = require('../models');
const crypto = require('crypto');

// Cadastro
router.post('/register', async (req, res) => {
  const { USU_VAR_NOME, USU_VAR_EMAIL, USU_VAR_TELEFONE, USU_VAR_SENHA } = req.body;
  try {
    const existingUser = await Usuario.findOne({ where: { USU_VAR_EMAIL } });
    if (existingUser) return res.status(400).json({ error: 'Email já cadastrado' });
    const hashedPw = await bcrypt.hash(USU_VAR_SENHA, 12);
    const user = await user.create({
      USU_VAR_NOME,
      USU_VAR_EMAIL,
      USU_VAR_TELEFONE,
      USU_VAR_SENHA: hashedPw,
      USU_TMS_DTCAD: new Date(),
      USU_TMS_DTALT: new Date(),
      USU_INT_COD_CAD: 1, // Ajuste para ID de usuário admin ou dinâmico
      USU_INT_COD_ALT: 1
    });
    res.status(201).json({ message: 'Usuário criado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { USU_VAR_EMAIL, USU_VAR_SENHA } = req.body;
  const usuario = await Usuario.findOne({ where: { USU_VAR_EMAIL } });
  if (!usuario || !await bcrypt.compare(USU_VAR_SENHA, usuario.USU_VAR_SENHA)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ USU_INT_ID: usuario.USU_INT_ID }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ 
    token, 
    usuario: { 
    id: usuario.USU_INT_ID, 
    nome: usuario.USU_VAR_NOME, 
    email: usuario.USU_VAR_EMAIL 
  } 
});
});

// Recuperação de senha
router.post('/forgot-password', async (req, res) => {
  const { USU_VAR_EMAIL } = req.body;
  const usuario = await Usuario.findOne({ where: { USU_VAR_EMAIL } });
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

  const token = crypto.randomBytes(20).toString('hex');
  usuario.USU_VAR_RESET_TOKEN = token;
  usuario.USU_TMS_RESET_EXP = new Date(Date.now() + 3600000); // Expira em 1h
  await usuario.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({
    to: USU_VAR_EMAIL,
    subject: 'Recuperação de Senha',
    text: `Clique para resetar: http://localhost:4200/reset/${token}`
  });
  res.json({ message: 'Email enviado' });
});

// Reset senha
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const usuario = await Usuario.findOne({
    where: { USU_VAR_RESET_TOKEN: token, USU_TMS_RESET_EXP: { [Op.gt]: new Date() } }
  });
  if (!usuario) return res.status(400).json({ error: 'Token inválido ou expirado' });

  usuario.USU_VAR_SENHA = await bcrypt.hash(newPassword, 12);
  usuario.USU_VAR_RESET_TOKEN = null;
  usuario.USU_TMS_RESET_EXP = new Date();
  await usuario.save();
  res.json({ message: 'Senha resetada' });
});

module.exports = router;