import React, { useState,useEffect } from 'react'
import './weatherapp.css'
import Search from "../Assets/search.png";
import Clear from "../Assets/clear.png";
import Cloud from "../Assets/cloud.png";
import Drizzle from "../Assets/drizzle.png";
import Rain from "../Assets/rain.png";
import Snow from "../Assets/snow.png";
import Humidity from "../Assets/humidity.png";
import Wind from "../Assets/wind.png";


const Weatherapp = () => {
    const [weatherData, setWeatherData] = React.useState(null);
    const [error, setError] = React.useState(null);
    let api_key = "c38f7f9c96878e3c35fdc3b6781f2387";
    const [wicon,setWicon]=useState(Cloud);

    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSearch = () => {
        const cityInput = document.querySelector('.cityInput');
        if (!cityInput || !cityInput.value.trim()) return;
        fetchWeatherData(cityInput.value.trim());
    };
    
    useEffect(() => {
        if (weatherData) {
            const iconCode = weatherData.weather[0].icon;
            setWicon(getWeatherIcon(iconCode));
        }
    }, [weatherData]);

    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                return Clear;
            case "02d":
            case "02n":
                return Cloud;
            case "03d":
            case "03n":
                return Drizzle;
            case "04d":
            case "04n":
                return Drizzle;
            case "09d":
            case "09n":
                return Rain;
            case "10d":
            case "10n":
                return Rain;
            case "13d":
            case "13n":
                return Snow;
            default:
                return Clear;
        }
    };

    return (
        <div className='whole'>
        <h1>WEATHER APP</h1>
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className='cityInput' placeholder='Enter city' />
                <div className='search-icon' onClick={handleSearch}>
                    <img src={Search} alt='search' />
                </div>
            </div>
            {weatherData && (
                <>
                    <div className='weather-image'>
                        {/* Render appropriate weather image based on weather condition */}
                        <img src={wicon} alt=''/>
                    </div>
                    <div className='temp'>{weatherData.main.temp}°C</div>
                    <div className='location'>{weatherData.name}</div>
                    <div className='data-container'>
                        <div className='element'>
                            <img src={Humidity} alt='' className='icon'/>
                            <div className='data'>
                                <div className='humidity-percent'>{weatherData.main.humidity}%</div>
                                <div className='text'>Humidity</div>
                            </div>
                        </div>
                        <div className='element'>
                            <img src={Wind} alt='' className='icon'/>
                            <div className='data'>
                                <div className='wind-rate'>{Math.floor(weatherData.wind.speed)} km/h</div>
                                <div className='text'>Wind speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {error && <div className='error-message'>{error}</div>}
        </div>
        </div>
    );
};

export default Weatherapp;