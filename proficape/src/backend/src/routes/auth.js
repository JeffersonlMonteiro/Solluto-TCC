const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const { Usuario } = require('../models');
const crypto = require('crypto');

// Validações
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password.length >= 6;

// Configuração do OAuth2 para Gmail
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/oauth2callback"
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Cadastro
router.post('/register', async (req, res) => {
  const { USU_VAR_NOME, USU_VAR_EMAIL, USU_VAR_TELEFONE, USU_VAR_SENHA } = req.body;
  if (!USU_VAR_NOME || !USU_VAR_EMAIL || !USU_VAR_SENHA) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }
  if (!validateEmail(USU_VAR_EMAIL)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (!validatePassword(USU_VAR_SENHA)) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
  }
  try {
    const existingUser = await Usuario.findOne({ where: { USU_VAR_EMAIL } });
    if (existingUser) return res.status(400).json({ error: 'Email já cadastrado' });
    const hashedPw = await bcrypt.hash(USU_VAR_SENHA, 12);
    await Usuario.create({
      USU_VAR_NOME,
      USU_VAR_EMAIL,
      USU_VAR_TELEFONE,
      USU_VAR_SENHA: hashedPw,
      USU_TMS_DTCAD: new Date(),
      USU_TMS_DTALT: new Date(),
      USU_INT_COD_CAD: req.USU_INT_ID || 1,
      USU_INT_COD_ALT: req.USU_INT_ID || 1
    });
    res.status(201).json({ message: 'Usuário criado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { USU_VAR_EMAIL, USU_VAR_SENHA } = req.body;

  if (!USU_VAR_EMAIL || !USU_VAR_SENHA) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

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

  if (!USU_VAR_EMAIL || !validateEmail(USU_VAR_EMAIL)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const usuario = await Usuario.findOne({ where: { USU_VAR_EMAIL } });
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

  const token = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  usuario.USU_VAR_RESET_TOKEN = hashedToken;
  usuario.USU_TMS_RESET_EXP = new Date(Date.now() + 3600000);
  await usuario.save();

  try {
    const { token: accessToken } = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken
      }
    });

    await transporter.sendMail({
      to: USU_VAR_EMAIL,
      subject: 'Recuperação de Senha',
      text: `Clique para resetar: ${process.env.FRONTEND_URL}/reset/${token}`
    });
    res.json({ message: 'Email enviado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar email: ' + err.message });
  }
});

// Reset senha
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const usuario = await Usuario.findOne({
    where: {
      USU_VAR_RESET_TOKEN: hashedToken,
      USU_TMS_RESET_EXP: { [Op.gt]: new Date() }
    }
  });

  if (!usuario) {
    return res.status(400).json({ error: 'Token inválido ou expirado' });
  }

  usuario.USU_VAR_SENHA = await bcrypt.hash(newPassword, 12);
  usuario.USU_VAR_RESET_TOKEN = null;
  usuario.USU_TMS_RESET_EXP = new Date();
  await usuario.save();
  res.json({ message: 'Senha resetada' });
});

module.exports = router;
