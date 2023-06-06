const express = require('express')
const router = express.Router()
const NotFoundError = require('./NotFoundError')

let customers = [{ id: 1, name: 'Roxanne', email: 'roxy@gmail.com' }]

const withAuth = (req, res, next) => {
  const auth = req.headers.authorization
  if (auth == 'Token valido') return next()
  res.status(401).send()
}

router.get('/customers', (req, res) => {
  res.json({
    customers
  })
})

router.post('/customers', withAuth, (req, res) => {
  const customer = req.body
  customer.id = customers.length + 1
  customers.push(customer)
  res.json({ status: 'ok' })
})

router.put('/customers/:id', (req, res) => {
  const id = Number(req.params.id)
  const customer = customers.find(customer => {
    return customer.id == id
  })
  if (!customer) throw new NotFoundError('customer')
  customer.name = req.body.name
  customer.price = req.body.price
  res.json({ status: 'ok' })
})

router.delete('/customers/:id', (req, res) => {
  const id = Number(req.params.id)
  customers = customers.filter(customer => {
    return customer.id != id
  })
  res.json({ status: 'ok' })
})

module.exports = router
