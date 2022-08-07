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
      const pressure_psi = Math.round(weather?.main.pressure*0.0145)
      const pressure_bar = Math.round(weather?.main.pressure*0.001)
      const visibility_km = weather?.visibility/1000

      return (
        <article className='container'>
          <div className='card'>
            <div className='container_title'>
              <h1>Weather App</h1>          
            </div>          
            <div className='container_location'>
              <h2>{` ${weather?.name}, ${weather?.sys.country}`}</h2>
              <p> {weather?.coord.lat} <span>N</span></p>
              <p>{weather?.coord.lon} <span>W</span></p>
            </div>
            <div  className='container_weather'>
              <div className='container_weather_image'>
                <h3>&#126; {weather?.weather[0].main} &#126;</h3>
                <h4>&#34;{weather?.weather[0].description}&#34;</h4> 
                <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
              </div>
              <div className='container_weather_data'>                
                <ul>
                  <li><span>-Wind Speed-</span></li>
                  <li>{weather?.wind.speed} m/s</li><br />
                  <li><span>-Clouds-</span></li>
                  <li>{weather?.clouds.all}%</li><br />
                  <li><span>-Humidity-</span></li>
                  <li>{weather?.main.humidity}%</li><br />
                  <li><span>-Presure-</span></li>
                  <li>{pressure_psi} PSI </li>
                  <li>({pressure_bar} bar)</li><br />
                  <li><span>-Visibility-</span></li>
                  <li>{visibility_km} Km</li>
                </ul>
              </div>
            </div>
            <div className='container_temperature'>
              <h2>{isCelcius ? temperature?.celcius : temperature?.farenheit}</h2>
              <button className='btn' onClick={handleClick}>{isCelcius ? 'Temp to °F' : 'Temp to °C'}</button>
            </div>  
            <footer>By Lolo</footer>             
          </div>  
        </article>
      )
    }
}

export default CardWeather



