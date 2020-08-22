import React from 'react';

const Filter = (props) => {
    
    const {searchString,handleSearch} = props;

    return (
        <div>
            find countries <input  value={searchString}  onChange={handleSearch}></input>
        </div>
    )
}

export default Filter;