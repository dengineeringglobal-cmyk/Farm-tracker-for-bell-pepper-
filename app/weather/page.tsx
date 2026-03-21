'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getWeatherRecords, addWeatherRecord } from '@/lib/storage'

export default function WeatherPage() {
  const [records, setRecords] = useState<any[]>([])
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    temperature: 25,
    humidity: 60,
    rainfall: 0,
    windSpeed: 5,
  })

  useEffect(() => {
    setRecords(getWeatherRecords())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addWeatherRecord(formData)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      temperature: 25,
      humidity: 60,
      rainfall: 0,
      windSpeed: 5,
    })
    setRecords(getWeatherRecords())
  }

  const avgTemp = records.length > 0 ? (records.reduce((sum, r) => sum + r.temperature, 0) / records.length).toFixed(1) : 0
  const avgHumidity = records.length > 0 ? (records.reduce((sum, r) => sum + r.humidity, 0) / records.length).toFixed(1) : 0
  const totalRainfall = records.reduce((sum, r) => sum + r.rainfall, 0).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="text-primary hover:text-primary-light mb-2 inline-block text-sm">
            ← Back to Dashboard
          </Link>
          <h1 className="text-primary">Weather Tracking</h1>
          <p className="text-neutral-700 mt-2">Record temperature, humidity, rainfall, and wind speed</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="stat-label">Average Temperature</p>
            <p className="stat-value text-primary">{avgTemp}°C</p>
          </div>
          <div className="card">
            <p className="stat-label">Average Humidity</p>
            <p className="stat-value text-primary">{avgHumidity}%</p>
          </div>
          <div className="card">
            <p className="stat-label">Total Rainfall</p>
            <p className="stat-value text-success">{totalRainfall}mm</p>
          </div>
          <div className="card">
            <p className="stat-label">Records</p>
            <p className="stat-value text-primary">{records.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="card">
              <h3 className="font-semibold text-foreground mb-4">Log Weather</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Temperature (°C) *</label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    step="0.5"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Humidity (%) *</label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="1"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Rainfall (mm)</label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    step="0.5"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Wind Speed (km/h)</label>
                  <input
                    type="number"
                    name="windSpeed"
                    value={formData.windSpeed}
                    onChange={handleChange}
                    step="0.5"
                    className="input-field w-full"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Log Weather
                </button>
              </div>
            </form>
          </div>

          {/* Records List */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">Weather Records</h3>
            {records.length > 0 ? (
              <div className="space-y-3">
                {records
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 30)
                  .map(record => (
                    <div key={record.id} className="card">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{record.date}</p>
                          <div className="text-sm text-neutral-700 mt-1 space-y-1">
                            <p>🌡️ Temperature: {record.temperature}°C</p>
                            <p>💧 Humidity: {record.humidity}%</p>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-semibold text-primary">{record.rainfall}mm rain</p>
                          <p className="text-neutral-700">{record.windSpeed}km/h wind</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="card text-center py-8">
                <p className="text-neutral-700">No weather records yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
