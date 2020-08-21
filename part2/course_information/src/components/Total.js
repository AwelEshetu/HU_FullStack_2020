import React from 'react';

const Total =({parts}) =>{
    
    //reducing a value from an object needs to have a key to hold the object as below

    const total=parts.reduce((cur,prev)=>{
      return { exercises: prev.exercises + cur.exercises};
    })
    //console.log('total is', total)
    return(
        <tr style={{fontWeight : 'bold'}}><td>{`total of ${total.exercises} exercises`}</td></tr>
    )
}

export default Total;