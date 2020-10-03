const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const password = process.argv[2]
//console.log( 'process variables ',process.argv)

const url =
  'mongodb+srv://goodman:Care1234@cluster0.clay1.mongodb.net/test_note-2020-app?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// eslint-disable-next-line no-unused-vars
const note = new Note({
  content: 'HTML is not Easy',
  date: new Date(),
  important: true,
})

// eslint-disable-next-line no-unused-vars
/*note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})