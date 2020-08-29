const express = require('express'),
	  cors = require('cors');

const app=express()

//corss origin middleware to allow communication between server running on ( port 3001)
//and client running on ( port 3000)
app.use(cors())

//json_parser middleware for retriving request body from requests
// with out the code below body of the request object won't be available
app.use(express.json())

//logger custom middleware
const requestLogger = (req,resp,next) =>{
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

//middleware for catching unknow request
const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
} 
  
app.use(requestLogger)

let notes = [  
    {    
        id: 1,    
        content: "HTML is easy",    
        date: "2019-05-30T17:30:31.098Z",    
        important: true  
    },  
        {    
            id: 2,    
            content: "Browser can execute only Javascript",    
            date: "2019-05-30T18:39:34.091Z",    
            important: false  
        },  
        {    
            id: 3,    
            content: "GET and POST are the most important methods of HTTP protocol",    
            date: "2019-05-30T19:20:14.298Z",    
            important: true  
        }]
   
//resquests  
app.get('/' , (req,resp) => {
  resp.send('<h1>hello world!</h1>');
})

app.get('/api/notes', (req,resp) => {
    resp.json(notes)
})

app.get('/api/notes/:id', (req,resp) => {
    const id= req.params.id;
    const note= notes.find(note =>  `${note.id}`===id);
    if(note){
        resp.json(note);
    }else{
        resp.status(404).send(`<h3>no notes found with id ${id} </h3>`)
    }
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

app.delete('/api/notes/:id', (req,resp) => {
    const id = Number(req.params.id);
    notes = notes.filter( note => note.id !== id);
    return resp.status(204).end();
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
