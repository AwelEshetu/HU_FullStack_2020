import React from 'react';

const Persons = ({filteredPersons}) => {
    return (
            filteredPersons.map(person=> 
                <p key={person.name}> {person.name} {person.number} </p>
            )
    )
}

export default Persons;