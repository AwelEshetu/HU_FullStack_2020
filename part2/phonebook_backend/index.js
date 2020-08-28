const express = require('express'),
      app = express(),
      PORT = 3001;

app.use(express.json())

let persons =  [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]

const generateId = () => {
        const maxId = persons.length > 0
          ? Math.max(...persons.map(n => n.id))
          : 0
        return maxId + 1
      }

app.get('/', (req,resp) => {
    resp.send(`<h3>Welcome to Phonebook APIs</h3>`);
})

app.get('/info', (req,resp) => {
    resp.send(`<p>Phone book has info for ${persons.length} people </p>
               <p>${new Date()} </p>`)
})

// get recoreds

app.get('/api/persons', (req,resp) => {
    resp.json(persons)
})

app.get('/api/persons/:id', (req,resp) => {
    const id = Number(req.params.id),
         person = persons.find(person => person.id===id);
   if(person){
    resp.json(person)
   }else{
       resp.status(404).json({
            error : `No person is found with id : ${id}`
       })
   }
    
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
          body.id = generateId();
          
    if(!body.name){
        resp.status(400).json({
            error: 'name missing from the record'
        })
    }else if(!body.number){
        resp.status(400).json({
            error: 'number missing from the record'
        })
    }else if (persons.map(person => person.name).includes(body.name)){
        resp.status(400).json({
            error :'name must be unique'
        })
    }else{
        
        persons = persons.concat(body)
        resp.json(persons)
    }

})
app.listen(PORT, ( ) => {
    console.log(`express app is running on port ${PORT}`)
});






