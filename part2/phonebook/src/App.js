import React, { useState ,useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm '
import Persons from './components/Persons'
import personService from './services/Persons'
const App = () => {
 
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameToSearch, setNameToSearch ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([]);
 
  useEffect (()=>{
      personService
      .getAll()
     .then(initialPersons=>{
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
     })
  },[]);


  const handleSubmit = (event) => {
      
      event.preventDefault();
      const names = persons.map(person => person.name);
            
      if(names.includes(newName)){
        const agree = window.confirm(`${newName} is already added to phonebook, replace the old number with new a new one?`);
        const id= persons.find( person => person.name ===newName).id;

        if(agree){
          personService
          .update(id,{name:newName, number:newNumber})
          .then(changedPerson => {
            setPersons(persons.filter(person => person.id !==id).concat(changedPerson))
            setFilteredPersons(persons.filter(person => person.id !==id).concat(changedPerson))
          })
        }        
      }else{
        personService
       .create({name:newName, number:newNumber})
       .then(changedPerson => {
        setPersons(persons.concat(changedPerson))
        setFilteredPersons(persons.concat(changedPerson))
       })
        
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

  const handleDelete = (id) => {
    const name = persons.find(person => person.id===id).name;
    const confirm = window.confirm(`delete ${name} ?`) ;
    if(confirm) {
      personService
      .remove(id)
      .then(response =>{
        setPersons(persons.filter(person => person.id !==id))
        setFilteredPersons(persons.filter(person => person.id !==id))
      })
    }
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )

}

export default App