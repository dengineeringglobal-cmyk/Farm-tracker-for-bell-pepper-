import React from 'react';
import { Cloud, CloudRain, Sun } from 'lucide-react';

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  location: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  humidity,
  windSpeed,
  description,
  location,
}) => {
  const getWeatherIcon = (desc: string) => {
    if (desc.toLowerCase().includes('rain')) {
      return <CloudRain className="w-10 h-10 text-blue-400" />;
    } else if (desc.toLowerCase().includes('clear') || desc.toLowerCase().includes('sunny')) {
      return <Sun className="w-10 h-10 text-yellow-400" />;
    }
    return <Cloud className="w-10 h-10 text-gray-400" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
          <p className="text-gray-600 text-sm capitalize">{description}</p>
        </div>
        {getWeatherIcon(description)}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-600 text-xs font-medium">Temperature</p>
          <p className="text-2xl font-bold text-blue-600">{temperature}°C</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs font-medium">Humidity</p>
          <p className="text-2xl font-bold text-blue-600">{humidity}%</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs font-medium">Wind</p>
          <p className="text-2xl font-bold text-blue-600">{windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
