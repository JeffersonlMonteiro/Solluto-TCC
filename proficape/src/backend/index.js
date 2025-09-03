
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/produtos', require('./src/routes/produtos'));
app.use('/api/pedidos', require('./src/routes/pedidos'));
app.use('/api/financeiro', require('./src/routes/financeiro'));

sequelize.sync({ force: false }) // Não recria tabelas se já existem
  .then(() => {
    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  })
  .catch(err => console.error('Erro ao conectar DB:', err));
