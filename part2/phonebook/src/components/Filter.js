import React from 'react';

const Filter = (props) => {
    console.log('Filter is called ')
    return (
        <div>
         filter shown with <input value={props.nameToSearch} onChange={props.handleSearch} />
      </div>
    )
}

export default Filter;