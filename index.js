require("dotenv").config()
const express = require("express")
const app = express()
const Person = require("./models/person")

app.use(express.static("build"))
app.use(express.json())

app.get("/api/persons", (request, response) => {
   Person.find({}).then((people) => {
      response.json(people)
   })
})

app.get("/api/persons/:id", (request, response) => {
   const id = String(request.params.id)

   Person.findById(id).then((person) => {
      response.json(person)
   })
})

app.get('/info', (request, response) => {
   Person.countDocuments({}, (error, count) => {
      response.json({
         totalContacts : count
      })
   })
})

app.delete('/api/persons/:id', (request, response) => {
   const id = String(request.params.id)

   Person.findByIdAndDelete(id).then(person => {
      console.log(person)
      if(person) {
         response.json(person)
      } else {
         response.status(404).end()
      }
   })
      .catch(error => {
         console.log(error)
         response.status(500).send({
            error : 'malformatted id'
         })
      })
})

app.put('/api/persons/:id', (request, response, next) => {
   const body = request.body
 
   const person = {
      name : body.name,
      number: body.number
   }
 
   Person.findByIdAndUpdate(request.params.id, person, { new: true })
     .then(updateContact => {
       response.json(updateContact)
     })
     .catch(error => next(error))
 })

app.post("/api/persons", (request, response) => {
   const body = request.body

   if (!body.name || !body.number) {
      return response.status(400).json({
         error: "name or number missing",
      })
   }

   Person.find({ name: String(body.name) }).then((result) => {
      console.log(result)
      if(result.length > 0) {
         return response.status(400).json({
            error : 'person already exists'
         })
      } else {
         const person = new Person({
            name: body.name,
            number: body.number,
         })
      
         person.save().then((savedPerson) => {
            response.json(savedPerson)
         })
      }
   })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
