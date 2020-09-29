const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { content: 1, date: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })


  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must have at least 3 characters' })
  }else{
    const savedUser = await user.save()
    response.json(savedUser)
  }

})

module.exports = usersRouter