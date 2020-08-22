import React, { useState ,useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm '
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
 
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameToSearch, setNameToSearch ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([]);
 
  useEffect (()=>{
      console.log('effect is run')
     axios
     .get('http://localhost:3001/persons')
     .then(response=>{
       console.log('response after fetch ', response)
        setPersons(response.data)
        setFilteredPersons(response.data)
     })
  },[]);

  console.log('render ',persons.length)

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