const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../database/index');

const { verifyToken } = require('../middlewares/jwt-validate');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true });
});

router.post('/login', async (req, res) => {
  
  // Buscamos el usuario con el mismo mail
  let usersResult = await pool.query('SELECT id, username, password FROM users WHERE username = $1', [req.body.username]);

  if (usersResult.rowCount === 0) {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }

  const user = usersResult.rows[0];
  console.log('User', user);

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Contraseña no válida' });
  }

  // Crear el token
  const token = jwt.sign({
    id: user.id,
    username: user.username
  }, process.env.TOKEN_SECRET);

  res.json({ error: null, data: 'Login exitoso', token });
});




module.exports = {
  router: router
};

 