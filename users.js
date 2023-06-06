const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const NotFoundError = require('./NotFoundError')

let users = [{ id: 1, name: 'John Doo', email: 'john@gmail.com' }]

const withAuth = (req, res, next) => {
  const auth = req.headers.authorization
  if (auth == 'Token valido') return next()
  res.status(401).send()
}

router.get('/users', (req, res) => {
  res.json({
    users
  })
})

router.post('/users', withAuth, (req, res) => {
  const user = req.body
  const hashedPassword = bcrypt.hashSync(user.password, 10)
  user.password = hashedPassword
  user.id = users.length + 1
  users.push(user)
  res.json({ status: 'ok' })
})

router.put('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => {
    return user.id == id
  })
  if (!user) throw new NotFoundError('user')
  user.name = req.body.name
  user.price = req.body.price
  res.json({ status: 'ok' })
})

router.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  users = users.filter(user => {
    return user.id != id
  })
  res.json({ status: 'ok' })
})

module.exports = router
