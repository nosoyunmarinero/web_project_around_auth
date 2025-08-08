const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));

app.use(express.json());

// Importar routers
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Recurso solicitado no encontrado' });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});