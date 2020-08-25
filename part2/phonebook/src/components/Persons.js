import React from 'react';

const Persons = ({filteredPersons,handleDelete}) => {
    console.log('Person is called ');
    return (
            filteredPersons.map(person=> 
                <div key={person.id}> {person.name} {person.number} <button onClick={()=>handleDelete(person.id)}> delete </button></div>
            )
    )
}

export default Persons;