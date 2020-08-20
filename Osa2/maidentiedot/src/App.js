import React, { useState,useEffect } from 'react'
import axios from 'axios'

// weatherdata saadaan https://weatherstack.com/ tarvitaan API-avain käynnistyksen yhteydessä, jotta ohjelma toimii.

//Kaipaisi refaktorointia omiin komponenttitiedostoihin.
// Vaikuttaa kaatuvan firefoxilla, toimii chromella


const CountryDataLanguagesLine = ({language}) => {

  return (

  
    <li>{language}</li>
  )
}

const CountryLine = ({name, setCountryFilter}) => {
  
  const handleShowClick = (event) => {
    
    setCountryFilter(name.toLowerCase())
  }
  
  return (
    <div>{name} <button onClick={handleShowClick}> Show </button></div>
  )
}




const CountryData = ({country, apiKey, setWeatherData, weatherData}) => {
//En oikein tiedä mikä on fiksu tapa tehdä niin, että säädata ladataan kun tiedetään maa. Nyt on vähän aikaa väärä data, kunnes lataa oikean.
 
const weatherDataLocation="http://api.weatherstack.com/current?access_key="+apiKey+"&query="+country.capital


useEffect(() => {
  axios
    .get(weatherDataLocation)
    .then(response => {
  
      setWeatherData(response.data)
    })
}, [country, setWeatherData, weatherDataLocation])


  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language =>
      <CountryDataLanguagesLine key={language.name} language={language.name}/>
        )}
      </ul>

      <img src={country.flag} width="150" alt="Country Flag"></img>

      <h2>Weather in {country.capital}</h2>
      <div><b>temperature: </b> {weatherData.current.temperature} celsius</div>
      <div><img src={weatherData.current.weather_icons[0]} width="150" alt="Country Flag"></img></div>
      <div><b>wind: </b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</div>


    </div>
  )
}



const CountryDisplay = ({countryList, countryFilter, setCountryFilter, apiKey, weatherData, setWeatherData}) => {
  //Tämä countrydisplayn logiikka tuntuu jotenkin ihmeelliseltä. Tällä se toimii, mutta ei varmaankaan järkevin tapa tehdä.

  
  const filteredCountries=countryList.filter(country => country.name.toLowerCase().includes(countryFilter) === true)
  

  const printCountries = filteredCountries.length>10
  ? <p>Please add more filters</p>
  : filteredCountries.map(country => <CountryLine key={country.name} name={country.name} setCountryFilter={setCountryFilter}/>)

  const whatToDo = filteredCountries.length===1
  ? <CountryData country={filteredCountries[0]} apiKey={apiKey} weatherData={weatherData} setWeatherData={setWeatherData}/>
  : printCountries


  
  return (
  <div>
    {whatToDo}
  </div>
 )
}



const App = () => {
  const apiKey=process.env.REACT_APP_API_KEY
 


  const [ countryList, setCountryList] = useState([])
  const [ countryFilter, setCountryFilter] = useState('')
  const [ weatherData, setWeatherData] = useState({"current": {"temperature": "loading", "wind_speed":"loading","wind_dir":"loading", "weather_icons": ["https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"]}})
  //const [ tooManyCountries, setTooManyCountries] = useState(true)
  


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryList(response.data)
      })
  }, [])
 

 

  const handleFilterChange = (event) => {
  setCountryFilter(event.target.value.toLowerCase())
  }

  
  return (
    <div>
      <form>
        <div>
          find countries: <input onChange={handleFilterChange} />
        </div>
      </form>
      <CountryDisplay  countryList={countryList} countryFilter={countryFilter} setCountryFilter={setCountryFilter} apiKey={apiKey} weatherData={weatherData} setWeatherData={setWeatherData}  />
      
    </div>
  )

}

export default App