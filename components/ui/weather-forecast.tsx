import React from 'react';

interface WeatherData {
    day: string;
    temperature: number;
    condition: string;
}

const weatherForecast: WeatherData[] = [
    { day: 'Day 1', temperature: 20, condition: 'Sunny' },
    { day: 'Day 2', temperature: 18, condition: 'Cloudy' },
    { day: 'Day 3', temperature: 22, condition: 'Rainy' },
    { day: 'Day 4', temperature: 19, condition: 'Sunny' },
    { day: 'Day 5', temperature: 21, condition: 'Cloudy' },
];

const WeatherForecast: React.FC = () => {
    return (
        <div>
            <h2>5-Day Weather Forecast</h2>
            <ul>
                {weatherForecast.map((forecast) => (
                    <li key={forecast.day}>
                        {forecast.day}: {forecast.temperature}°C, {forecast.condition}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherForecast;