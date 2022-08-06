import axios from 'axios'
import React, {useEffect, useState} from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({ lat, lon}) => {
    
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelcius, setIsCelcius] = useState(true)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {        

        if(lat){
            const APIKey = '8f2c7d655f66057299462f672c3010d4'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

            axios.get(URL)
            .then(res => {
              setWeather(res.data)
                const temp = {
                  celcius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                  farenheit: `${Math.round((res.data.main.temp - 273.15)*9/5 + 32)} °F`
                }
              setTemperature(temp)
              setIsLoading(false)
              
            })
            .catch(err => console.log(err))
          }        

    }, [lat,lon])    


    console.log(weather);

    const handleClick = () => setIsCelcius(!isCelcius)

    if(isLoading){
      return <LoadingScreen />
    }else{
      const temp_psi = Math.round(weather?.main.pressure*0.0145)
      const visibility_km = weather?.visibility/1000
      return (
        <article>
          <h1>Weather App</h1>
          <h2>{` ${weather?.name}, ${weather?.sys.country}`}</h2>
          <div>
            <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            <div>
              <h3>&#34;{weather?.weather[0].description}&#34;</h3>        
              <ul>
                <li><span>Wind Speed: </span>{weather?.wind.speed} m/s</li>
                <li><span>Clouds: </span>{weather?.clouds.all}%</li>
                <li><span>Humidity: </span>{weather?.main.humidity}%</li>
                <li><span>Presure: </span>{temp_psi} PSI</li>
                <li><span>Visibility: </span>{visibility_km} Km</li>
              </ul>
            </div>
            <h2>{isCelcius ? temperature?.celcius : temperature?.farenheit}</h2>
            <button onClick={handleClick}>{isCelcius ? 'Change to °F' : 'Change to °C'}</button>
          </div>      
        </article>
      )
    }
}

export default CardWeather



