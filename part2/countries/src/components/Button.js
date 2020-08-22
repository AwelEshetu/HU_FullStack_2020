import React from 'react'

const Button = ({status,handleClick}) => {
    
    return (
    <button onClick={handleClick}>{status ? 'hide' :'show'}</button>
    )
}

export default Button;