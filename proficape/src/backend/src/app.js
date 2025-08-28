const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('./users');
const { CONNREFUSED } = require('dns');

if(!process.env.JWT_SECRET){
  throw new Error('falta JWT_SECRET no .env');
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/singup', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  const userExist = users.find(u => u.username === username);
  if(userExist){
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword };
  users.push(newUser);
  const token = jwt.sign({ id: newUser.id, message: 'User created successfully' }, process.env.JWT_SECRET);
  res.status(201).json({ token });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = users.find(u => u.username === username);
  if(!user){
    return res.status(400).json({ error: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id, message: 'Login successful' }, process.env.JWT_SECRET);
  res.status(200).json({ token });
});

function authMiddleware(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  app.get('/protected', authMiddleware, (req, res) => {
    res.json({message: `Hello, ${req.user.username}!`});
    });
app.get('/', (req, res) => {
  res.send('API running!');
});

module.exports = app;