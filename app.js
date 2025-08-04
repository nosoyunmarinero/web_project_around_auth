const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ← Instalar: npm install cors
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

// Configurar CORS ANTES de otros middlewares
app.use(cors({
  origin: 'http://localhost:5000', // Tu frontend
  credentials: true
}));

app.use(express.json());

// Middleware global
app.use((req, res, next) => {
  req.user = { _id: '68632b97f447f5780627fee1' };
  next();
});

// Importar routers
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');

// Usar routers
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Recurso solicitado no encontrado :c' });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});