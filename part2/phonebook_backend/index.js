
require('dotenv').config();

const express = require('express'),
      morgan = require('morgan'),
      cors = require('cors'),
      Person = require('./models/person'),
      PORT = process.env.PORT,
      app = express();

//corss origin middleware to allow communication between server running on ( port 3001)
//and client running on ( port 3000)
app.use(cors())

//json_parser middleware for retriving request body from requests
// with out the code below body of the request object won't be available
app.use(express.json())

//server the html of the front_end using static middleware
app.use(express.static('build'))

//configure morgan request body logger
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
//use morgange as tiny formate
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

/*-----custome middlewares ----*/
//middleware to log requests
const requestLogger = (req, resp, next) =>{
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
  }
//middleware for handling unknow endpoint requests
const unknownEndpoint = (req, resp) => {
    resp.status(404).send({ error: 'unknown endpoint' })
  }
  
  //middleware to handle error for malformatted id
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'malformatted id' })
    }else if( error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
  
    next(error)
  }

app.get('/', (req, resp) => {
    resp.send(`<h3>Welcome to Phonebook APIs</h3>`);
})

app.get('/info', (req, resp) => {
    Person.find({}).then( persons => {
        resp.send(`<p>Phone book has info for ${persons.length} people </p>
               <p>${new Date()} </p>`)
    });
    
})

// get recoreds
app.get('/api/persons', (req,resp) => {
    Person.find({}).then( persons => {
        resp.json(persons)
    })
    
})

app.get('/api/persons/:id', (req, resp, next) => {
    Person.findById(req.params.id).then( person => {
        if(person){
            resp.json(person)
        }else{
            resp.status(404).end()
        }     
    })
    .catch(error => next(error))
    
})

// delete record
app.delete('/api/persons/:id', (req, resp, next) => {
    Person.findByIdAndRemove(req.params.id).then( result =>{
        resp.status(204).end()
    })
    .catch(error => next(error))
})

//add new record

app.post('/api/persons', (req, resp, next) => {
    const body = req.body;
        const person = new Person({
                name : body.name,
                number : body.number
            }) 
        person.save()
        .then(savedPerson =>savedPerson.toJSON())
        .then(savedAndFormattedPerson => resp.json(savedAndFormattedPerson))
        .catch(error => next(error))

})
//update numer for existing person
app.put('/api/persons/:id', (req, resp, next) => {
    const body = req.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators:true, context:'query'})
      .then(updatedPerson => {
        resp.json(updatedPerson)
      })
      .catch(error => next(error))
  })

//middlewares in use
app.use(requestLogger)
app.use(errorHandler)
app.use(unknownEndpoint)

app.listen(PORT, ( ) => {
    console.log(`express app is running on port ${PORT}`)
});






