const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Agregar import del middleware
const auth = require('./middleware/auth');

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));

app.use(express.json());

// Remover el middleware hardcodeado de usuario
// app.use((req, res, next) => {
//   req.user = { _id: '6891884ac3ec4e14df8982ba' };
//   next();
// });

// Importar routers
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');

// Usar routers - auth no necesita protección
app.use('/auth', authRouter);

// Proteger rutas que requieren autenticación
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Recurso solicitado no encontrado' });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});