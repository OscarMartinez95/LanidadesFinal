const jwt = require('jsonwebtoken')


// middleware to validate token 
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' })
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    // {
    //   id: user.id,
    //   username: user.username
    // }
    req.user = verified;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({error: 'El Token no es válido'})
  }
}

module.exports = {
  verifyToken
};