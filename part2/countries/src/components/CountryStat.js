import React from 'react'

const CountryStat = ({country}) => {

    return (
            <div key={country.name}>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>population {country.population.toLocaleString()}</p>
                <h2>Languages</h2>
                <ul>
                {
                    country.languages.map(lang =>
                        <li key={lang.name}>{lang.name}</li>
                        )
                }
                </ul>
              <img src={country.flag} alt='country flag' height={100} width={150} />
            </div>
    )
}

export default CountryStat;