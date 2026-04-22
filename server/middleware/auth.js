const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ message: 'Нет токена, доступ запрещён' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Неверный токен' })
  }
}