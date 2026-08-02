require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const { sequelize } = require('./src/models');
const auth = require('./src/middlewares/auth');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2callback", // 🔥 corrigido
  },
  function (accessToken, refreshToken, profile, done) {
    const user = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    };
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Iniciar login com Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback do Google (🔥 ajustado para combinar com callbackURL)
app.get('/oauth2callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:4200/dashboard');
  }
);

// Rota para logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:4200/');
  });
});

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')|| origin.endsWith('github.dev')) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
    
// Rotas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/produtos', require('./src/routes/produtos'));
app.use('/api/pedidos', require('./src/routes/pedidos'));
app.use('/api/financeiro', require('./src/routes/financeiro'));

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  })
  .catch(err => console.error('Erro ao conectar DB:', err));
