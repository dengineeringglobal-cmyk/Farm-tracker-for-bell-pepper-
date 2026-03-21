'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  getPlants,
  getHarvestLogs,
  getWateringLogs,
  getFertilizerLogs,
  getWeatherRecords,
  Plant,
} from '@/lib/storage'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export default function ReportsPage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [harvestData, setHarvestData] = useState<any[]>([])
  const [wateringData, setWateringData] = useState<any[]>([])
  const [weatherTrends, setWeatherTrends] = useState<any[]>([])
  const [selectedPlant, setSelectedPlant] = useState<string>('')

  useEffect(() => {
    const plantsData = getPlants()
    setPlants(plantsData)
    if (plantsData.length > 0) {
      setSelectedPlant(plantsData[0].id)
    }

    // Process harvest data
    const harvests = getHarvestLogs()
    const harvestByDate = harvests.reduce((acc: any, log: any) => {
      const existing = acc.find((h: any) => h.date === log.date)
      if (existing) {
        existing.quantity += log.quantity
        existing.weight += log.weight
      } else {
        acc.push({
          date: log.date,
          quantity: log.quantity,
          weight: log.weight,
        })
      }
      return acc
    }, [])
    setHarvestData(harvestByDate.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()))

    // Process watering data
    const waterings = getWateringLogs()
    const wateringByDate = waterings.reduce((acc: any, log: any) => {
      const existing = acc.find((w: any) => w.date === log.date)
      if (existing) {
        existing.amount += log.amount
        existing.moisture = (existing.moisture + log.soilMoisture) / 2
      } else {
        acc.push({
          date: log.date,
          amount: log.amount,
          moisture: log.soilMoisture,
        })
      }
      return acc
    }, [])
    setWateringData(wateringByDate.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()))

    // Process weather trends
    const weather = getWeatherRecords()
    const weatherByDate = weather.reduce((acc: any, record: any) => {
      const existing = acc.find((w: any) => w.date === record.date)
      if (existing) {
        existing.temperature = (existing.temperature + record.temperature) / 2
        existing.humidity = (existing.humidity + record.humidity) / 2
      } else {
        acc.push({
          date: record.date,
          temperature: record.temperature,
          humidity: record.humidity,
        })
      }
      return acc
    }, [])
    setWeatherTrends(weatherByDate.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-30))
  }, [])

  const totalHarvested = harvestData.reduce((sum, d) => sum + d.quantity, 0)
  const totalWatered = wateringData.reduce((sum, d) => sum + d.amount, 0)
  const harvestRecords = getHarvestLogs()
  const excellentQuality = harvestRecords.filter(h => h.quality === 'excellent').length

  const healthStatus = plants.reduce(
    (acc, p) => {
      acc[p.healthStatus] = (acc[p.healthStatus] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const healthData = Object.entries(healthStatus).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))

  const COLORS = ['#4d8028', '#d4a320', '#c1392b']

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="text-primary hover:text-primary-light mb-2 inline-block text-sm">
            ← Back to Dashboard
          </Link>
          <h1 className="text-primary">Reports & Analytics</h1>
          <p className="text-neutral-700 mt-2">View yield trends and farm performance</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="stat-label">Total Plants</p>
            <p className="stat-value text-primary">{plants.length}</p>
          </div>
          <div className="card">
            <p className="stat-label">Total Harvested</p>
            <p className="stat-value text-success">{totalHarvested}</p>
          </div>
          <div className="card">
            <p className="stat-label">Excellent Quality</p>
            <p className="stat-value text-success">{excellentQuality}</p>
          </div>
          <div className="card">
            <p className="stat-label">Total Water Used</p>
            <p className="stat-value text-primary">{totalWatered.toFixed(1)}L</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Harvest Trend */}
          {harvestData.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-foreground mb-4">Harvest Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={harvestData.slice(-30)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quantity" stroke="#4d8028" name="Fruits" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Watering Pattern */}
          {wateringData.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-foreground mb-4">Watering Pattern</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={wateringData.slice(-30)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#2d5016" name="Water (L)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Weather Trends */}
          {weatherTrends.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-foreground mb-4">Temperature & Humidity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weatherTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#c2623d" name="Temp (°C)" />
                  <Line type="monotone" dataKey="humidity" stroke="#4d8028" name="Humidity (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Plant Health Status */}
          {healthData.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-foreground mb-4">Plant Health Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Detailed Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold text-foreground mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-neutral-700">Total Plants:</span>
                <span className="font-semibold text-foreground">{plants.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-neutral-700">Healthy Plants:</span>
                <span className="font-semibold text-success">{healthStatus.healthy || 0}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-neutral-700">Plants Needing Attention:</span>
                <span className="font-semibold text-warning">{(healthStatus.warning || 0) + (healthStatus.critical || 0)}</span>
              </p>
              <p className="flex justify-between border-t pt-2 mt-2">
                <span className="text-neutral-700">Total Harvests Recorded:</span>
                <span className="font-semibold text-foreground">{harvestRecords.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-neutral-700">Total Water Logs:</span>
                <span className="font-semibold text-foreground">{wateringData.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-neutral-700">Weather Records:</span>
                <span className="font-semibold text-foreground">{weatherTrends.length}</span>
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-foreground mb-4">Export Data</h3>
            <p className="text-sm text-neutral-700 mb-4">Download your farm data as a spreadsheet for further analysis</p>
            <button
              onClick={() => {
                // Simple CSV export functionality
                const data = {
                  plants: getPlants(),
                  harvests: getHarvestLogs(),
                  watering: getWateringLogs(),
                  fertilizer: getFertilizerLogs(),
                  weather: getWeatherRecords(),
                }
                const csv = JSON.stringify(data, null, 2)
                const element = document.createElement('a')
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv))
                element.setAttribute('download', 'farm-tracker-data.json')
                element.style.display = 'none'
                document.body.appendChild(element)
                element.click()
                document.body.removeChild(element)
              }}
              className="btn-primary"
            >
              Export as JSON
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
