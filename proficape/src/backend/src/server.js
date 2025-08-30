const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET = 'segredoSecreto';
const USERS_FILE = 'users.json';

//middleware
app.use(bodyParser.json());
app.use(cors());

//vai carregar usuários JSON ou cria um vazio
let users = [];
if(fs.existsSync(USERS_FILE))
    users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));

app.post('/', (req, res) => {
    res.send('POST recebido com sucesso!');
});
app.listen(3000, () =>{
    console.log('Servidor rodando na porta 3000');
});


//rota de cadastro
app.post('/register', async (req, res) => {
const { email, password }= req.body;
if(!email || !password) return res.status(400).json({message: 'email e senha são obrigatórios!'});    

const existingUser = users.find(u => u.email === email);
if(existingUser) return res.status(400).json({ message: 'Usuário já existe!'});

const hashedPassword = await bcrypt.hash(password, 10);
const newUser = { email, password: hashedPassword };
users.push(newUser);
saveUsers();
res.status(201).json({ message: 'cadastro feito com sucesso!'});
});

//rota de login (POST /login)
app.post('/login', async (req, res) => {
const { email, password } = req.body;
const user = users.find( u => u.email == email);
if(!user) return res.status(400).json({ message: 'Usuário não encotrado' });

const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch) return res.status(400).json({ message: 'senha errada!'});

const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h'});
res.json({ token });
});

//middleware de autenticação 

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'sem token!'});

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'token inválido'});
    }  
}

//exemplo de rota protegida (GET /protected)
app.get('/protected', authenticate, (req, res) =>{
    res.json({ message: `Bem-vindo de volta, ${req.user.email}!`});
});

//Rota de recuperação de senha (POST / ForgotPassword)
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    const user = users.find(u => u.email === email);
    if(!user) return res.status(400).json({ message: 'email não encontrado!'});

    //simula envio de email: gera token de reset (expira em 15 min)
    const resetToken = jwt.sign({ email }, SECRET, { expiresIn: '15m'});
    console.log(`link de reset para ${email}: http://localhost:3000/reset-password?token=${resetToken}`);
    res.json({message: 'instruções enviadas!'});
});

//rota de reset de senha (POST / reset-password)
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, SECRET);
       const user = users.find(u => u.email === decoded.email);
        if (!user) return res.status(400).json({ message: 'Usuário não encontrado.' });

        user.password = await bcrypt.hash(newPassword, 10);
        saveUsers();
        res.json({ message: 'Senha resetada com sucesso, agora é só logar!' });
    } catch (err) {
        res.status(400).json({ message: 'Token inválido ou expirado!' });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));