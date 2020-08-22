import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter'
import Country from './components/Country'

const App = () =>  {

  const [countries, setCountries] = useState([])
  const [searchString, setsearchString] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [status, setShow] = useState({})

  useEffect(()=>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response=>{
      setCountries(response.data)
    })
  },[])

  const handleSearch = (event) => {
       
       let searchString = event.target.value,
           country = countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase())),
           countryStatus= country.reduce((result,country) =>{
           result[country.alpha2Code] = false; 
           return result;
         }, {});

       setsearchString(searchString)
       setFilteredCountries(country)
       setShow(countryStatus)
  }
  
  const handleClick = (country) => ()=> {
    
    let modefied={};
    for( let key of Object.keys(status)){
      if(key===country.alpha2Code){
        modefied[key] = ! status[key]
      }else{
        modefied[key] =  status[key]
      }
    }
    setShow(modefied);
  }

  let filterProps={
    handleSearch,
    searchString
  }

  let countryProps={
    filteredCountries,
    handleClick,
    status
  }
  
  return (
    <div>
      <Filter {...filterProps} />
      {
        filteredCountries.length > 0 ?
        <Country {...countryProps} /> :
        null
      }
      
    </div>
  );
}

export default App;
