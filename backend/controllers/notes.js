const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// connect to db and get all notes
notesRouter.get('/', async (req, resp) => {
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })

  resp.json(notes)
})

notesRouter.get('/:id', async (req, resp) => {

  const note= await Note.findById(req.params.id)
  if (note) {
    resp.json(note)
  } else {
    resp.status(404).end()
  }


})


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/', async (req, resp) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return resp.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  resp.json(savedNote)

})


notesRouter.delete('/:id', async (req, resp) => {

  await Note.findByIdAndRemove(req.params.id)
  resp.status(204).end()

})

//update importance of a note
notesRouter.put('/:id', async (req, resp) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important,
  }


  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
  resp.json(updatedNote)


})

module.exports = notesRouter