import React from 'react';

interface WeatherCardProps {
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ temperature, humidity, windSpeed, description }) => {
    return (
        <div className="weather-card">
            <h2>Current Weather</h2>
            <p><strong>Temperature:</strong> {temperature} °C</p>
            <p><strong>Humidity:</strong> {humidity} %</p>
            <p><strong>Wind Speed:</strong> {windSpeed} km/h</p>
            <p><strong>Condition:</strong> {description}</p>
        </div>
    );
};

export default WeatherCard;