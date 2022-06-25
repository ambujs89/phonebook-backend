const express = require('express')
const app = express()

app.use(express.json())

morgan.token('body', (request, response) => {
   return JSON.stringify(request.body)
})

let persons = [
   { 
     "id": 1,
     "name": "Arto Hellas", 
     "number": "040-123456"
   },
   { 
     "id": 2,
     "name": "Ada Lovelace", 
     "number": "39-44-5323523"
   },
   { 
     "id": 3,
     "name": "Dan Abramov", 
     "number": "12-43-234345"
   },
   { 
     "id": 4,
     "name": "Mary Poppendieck", 
     "number": "39-23-6423122"
   }
]

app.get('/', (request, response) => {
   response.send({
      "status" : "working",
   })
})

app.get('/api/persons', (request, response) => {
   response.json(persons)
})

app.get('/info', (request,response) => {
   const date = new Date()
   response.send(
      `<div>The phonebook has ${persons.length} people</div>
      <div>${date}</div>`
   )
})

app.get('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   const person = persons.find(person => person.id === id)

   if(person) {
      response.json(person)
   } else {
      response.status(404).end()
   }
})

app.delete('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   persons = persons.filter(person => person.id !== id)
   
   response.status(204).end()
})

const getRandomInt = (min, max) => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateId = () => {
   const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0

   return getRandomInt(maxId + 1, 1000)
}

app.post('/api/persons', (request, response) => {
   const body = request.body

   if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
   }

   const alreadyExists = persons.filter(person => person.name === body.name)

   if(alreadyExists.length > 0) {
      return response.status(406).json({
         error: 'persons already exists'
      })
   }

   const person = {
      id : generateId(),
      name : body.name,
      number : body.number,
   }

   persons = persons.concat(person)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})