const mongoose = require("mongoose")

if (process.argv.length < 3) {
   console.log(
      "Please provide the password as an argument: node mongo.js <password>"
   )
   process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mongoDB-sandbox:${password}@cluster0.zny01pb.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
   name: String,
   number: Number,
})

const Person = mongoose.model("Person", personSchema)

const name = String(process.argv[3])
const number = Number(process.argv[4])

mongoose
   .connect(url)
   .then((result) => {
      console.log("connects")

      const person = new Person({
         name: name,
         number: number,
      })

      return person.save()
   })
   .then(() => {
      console.log("added", name, "number", number, "to phonebook")
      return mongoose.connection.close()
   })
   .catch((err) => console.log(err))

Person.find({}).then((result) => {
   console.log("Phonebook")
   result.forEach((person) => {
      console.log(person)
   })
   return mongoose.connection.close()
})
