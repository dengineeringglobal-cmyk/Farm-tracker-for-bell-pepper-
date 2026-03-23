'use client';

import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, MapPin } from 'lucide-react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('');

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'demo';
  const DEFAULT_CITY = process.env.NEXT_PUBLIC_FARM_LOCATION || 'London';

  useEffect(() => {
    if (API_KEY === 'demo') {
      setError('Weather API key not configured. Please add NEXT_PUBLIC_WEATHER_API_KEY to your environment variables.');
      setLoading(false);
      return;
    }
    
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`City "${city}" not found. Please check the spelling.`);
          } else if (response.status === 401) {
            throw new Error('Invalid API key. Please check your NEXT_PUBLIC_WEATHER_API_KEY.');
          } else {
            throw new Error('Failed to fetch weather data');
          }
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('[v0] Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, API_KEY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity('');
    }
  };

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun className="w-12 h-12 text-yellow-400" />;
      case 'clouds':
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      default:
        return <Cloud className="w-12 h-12 text-gray-400" />;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Information</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading weather data...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">{error}</p>
          <p className="text-red-600 text-sm mt-2">To enable weather features, please:</p>
          <ol className="text-red-600 text-sm list-decimal list-inside mt-1">
            <li>Get an API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="underline">OpenWeatherMap</a></li>
            <li>Add it to your environment variables as NEXT_PUBLIC_WEATHER_API_KEY</li>
          </ol>
        </div>
      )}

      {!loading && !error && weatherData && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">{weatherData.name}</h3>
              </div>
              <p className="text-gray-600 capitalize">{weatherData.weather[0].description}</p>
            </div>
            {getWeatherIcon(weatherData.weather[0].main)}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-gray-600 text-sm font-medium mb-1">Temperature</p>
              <p className="text-3xl font-bold text-blue-600">{Math.round(weatherData.main.temp)}°C</p>
              <p className="text-gray-500 text-xs">Feels like {Math.round(weatherData.main.feels_like)}°C</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <p className="text-gray-600 text-sm font-medium">Humidity</p>
              </div>
              <p className="text-3xl font-bold text-blue-600">{weatherData.main.humidity}%</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center gap-2 mb-1">
                <Wind className="w-4 h-4 text-blue-500" />
                <p className="text-gray-600 text-sm font-medium">Wind Speed</p>
              </div>
              <p className="text-3xl font-bold text-blue-600">{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-gray-600 text-sm font-medium mb-1">Cloud Cover</p>
              <p className="text-3xl font-bold text-blue-600">{weatherData.clouds.all}%</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && !weatherData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">No weather data available. Please enter a city name.</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
