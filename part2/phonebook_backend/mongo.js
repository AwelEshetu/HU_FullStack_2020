const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]
//console.log( 'process variables ',process.argv)

const url =
  `mongodb+srv://goodman:${password}@cluster0.clay1.mongodb.net/phonebook-2020-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// eslint-disable-next-line no-unused-vars
const person= new Person({
  name:'Mary Poppendieck',
  number :'39-23-6423122'
})

/*person.save().then(result => {
  console.log('saved person: ', result)
  mongoose.connection.close()
})*/

Person.find({}).then(result => {
  result.forEach(people => {
    console.log(people)
  })
  mongoose.connection.close()
})