const express = require('express')
const router = express.Router()
const NotFoundError = require('./NotFoundError')

let recipes = [
  {
    id: 1,
    name: 'Roxanne',
    description: 'Just a lovely recipe from my mother.',
    preparationTime: '30 minutes'
  }
]

const withAuth = (req, res, next) => {
  const auth = req.headers.authorization
  if (auth == 'Token valido') return next()
  res.status(401).send()
}

router.get('/recipes', (req, res) => {
  res.json({
    recipes
  })
})

router.post('/recipes', withAuth, (req, res) => {
  const recipes = req.body
  recipe.id = recipes.length + 1
  recipes.push(recipe)
  res.json({ status: 'ok' })
})

router.put('/recipes/:id', (req, res) => {
  const id = Number(req.params.id)
  const recipe = recipes.find(recipe => {
    return recipe.id == id
  })
  if (!recipe) throw new NotFoundError('recipe')
  recipe.name = req.body.name
  recipe.price = req.body.price
  res.json({ status: 'ok' })
})

router.delete('/recipes/:id', (req, res) => {
  const id = Number(req.params.id)
  recipes = recipes.filter(arecipe => {
    return recipe.id != id
  })
  res.json({ status: 'ok' })
})

module.exports = router
