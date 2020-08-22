import React from 'react'
import CountryStat from './CountryStat'
import Button from './Button'

const Country = (props) => {

    const {filteredCountries, handleClick, status} = props;

    return (
        <div>
            {
                filteredCountries.length > 10 ? 
                <p>Too many matches, specify another filter</p>
                : 
                filteredCountries.map(coun => 
                    <div key={coun.name}>
                    <p>{coun.name} <Button  handleClick={handleClick(coun)} status={status[coun.alpha2Code]}/></p>
                    {
                        status[coun.alpha2Code] ? 
                        <CountryStat country={coun} /> :
                        null
                    }
                    </div>
                    )
            }
        </div>       
    )
}

export default Country;