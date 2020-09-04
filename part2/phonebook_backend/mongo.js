const mongoose = require('mongoose');

//check if password was given from command-line

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
  //capture password from command-line
  const password = process.argv[2]

// db url and start connection  
  const url =
    `mongodb+srv://goodman:${password}@cluster0.clay1.mongodb.net/phonebook-2020-app?retryWrites=true&w=majority`
  
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  //create personSchema and Person model using mongoose
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  const Person = mongoose.model('Person', personSchema)

  //create dummy person object from arguments passed to command-line
  const givenPerson = {
      name : process.argv[3],
      number : process.argv[4]
  };

  const person = new Person(givenPerson);

  // if name and number are not passed get persons collection and print it else 
  // save the object to persons collection in db

  if(!givenPerson.name || !givenPerson.number){
    console.log('Phonebook: ')
        Person.find({}).then(persons =>{
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close();
        })
  }else{
    person.save().then( result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close();
    })
  }
