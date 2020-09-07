
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

app.get('/', (req,resp) => {
    resp.send(`<h3>Welcome to Phonebook APIs</h3>`);
})

app.get('/info', (req,resp) => {
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

app.get('/api/persons/:id', (req,resp) => {
    Person.findById(req.params.id).then( person => {
        resp.json(person)
    })
    
})

// delete record

app.delete('/api/persons/:id', (req,resp) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !==id);
    return resp.status(204).end();
})

//add new record

app.post('/api/persons', (req, resp) => {
    const body = req.body;
          
    if(!body.name){
        resp.status(400).json({
            error: 'name missing from the record'
        })
    }else if(!body.number){
        resp.status(400).json({
            error: 'number missing from the record'
        })
    }else{
        const person = new Person({
                name : body.name,
                number : body.number
            }) 
        person.save().then(savePerson => {
            resp.json(savePerson)
        })
    }

})
app.listen(PORT, ( ) => {
    console.log(`express app is running on port ${PORT}`)
});






