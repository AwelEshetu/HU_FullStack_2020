import React from 'react';

const Filter = (props) => {

    return (
        <div>
         filter shown with <input value={props.nameToSearch} onChange={props.handleSearch} />
      </div>
    )
}

export default Filter;