const express = require('express')
const customerRouter = require('./customers')
const usersRouter = require('./users')
const NotFoundError = require('./NotFoundError')
const recipesRouter = require('./recipes')

const server = express()

server.use(express.json())

server.use((req, res, next) => {
  console.log('time: ' + new Date().toISOString())
  next()
})

server.use(customerRouter)

server.use((err, req, res, next) => {
  console.error('>>>>> ' + err)
  next(err)
})

server.use(recipesRouter)

server.use((err, req, res, next) => {
  console.error('>>>>> ' + err)
  next(err)
})

server.use(usersRouter)

server.use((err, req, res, next) => {
  console.error('>>>>> ' + err)
  next(err)
})

server.use((err, req, res, next) => {
  console.error('>>>>> ' + err)
  if (err instanceof NotFoundError)
    return res.status(404).json({ message: err.message })
  res.status(500).json({ message: 'internal server error' })
})

module.exports = server
