import React from 'react';

const Part = ({parts}) => {
    return (
        parts.map(part=>
            <tr key={part.id}><td>{part.name}</td><td>{part.exercises}</td></tr>
       )
    )
}

export default Part;