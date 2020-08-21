import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm '
import Persons from './components/Persons'


const App = () => {
 
   const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameToSearch, setNameToSearch ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons);

  const handleSubmit = (event) => {
      event.preventDefault();
      const names= persons.map(person => person.name);
     
      if(names.includes(newName)){

         alert(`${newName} is already added to phonebook`) 
         
      }else{
        setPersons(persons.concat([{name:newName, number:newNumber}]))
        setFilteredPersons(persons.concat([{name:newName, number:newNumber}]))
      }

      setNewName('');
      setNewNumber('');
     
  }

  const handleName = (event) => {
      const name = event.target.value;
      setNewName(name);
  }
 
  const handleNumber = (event) => {
      const number = event.target.value;
      setNewNumber(number);
  }
 
  const handleSearch = (event) =>{

      const searchString = event.target.value;

      const filteredPersons= persons.filter( person => 
          person.name.toLowerCase().includes(searchString.toLowerCase())
      )
        setNameToSearch(searchString)
        setFilteredPersons( [...filteredPersons] )     
      
  }

  let  filterProps = {
       nameToSearch,
       handleSearch
  }

 let personFormProps = {
    handleSubmit,
    handleName,
    handleNumber,
    newName,
    newNumber
 }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter {...filterProps} />
      <h2>add a new</h2>
      <PersonForm  {...personFormProps} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App