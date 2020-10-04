const config = require('./utils/config')
const express = require('express')
//use of express-async-errors hides try catch blocks( catch happens under the hood)
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//database reseting api for testing
if (process.env.NODE_ENV === 'test') { 
 const testingRouter = require('./controllers/testing')  
 app.use('/api/testing', testingRouter)
 }
 
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app