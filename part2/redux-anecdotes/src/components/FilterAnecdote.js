import React from 'react'
import { connect } from 'react-redux'

import { filter } from '../reducers/anecdoteReducer'
const Filter = (props) => {
    
    //console.log('store from filter ',store.getState())
  const handleChange = (event) => {
      const query = event.target.value
      props.filter(query)
         
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
const mapDispatchToProps = {
    filter
}

export default connect(null,mapDispatchToProps)(Filter)