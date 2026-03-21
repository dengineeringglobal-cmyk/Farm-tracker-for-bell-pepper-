'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPlants, getWateringLogs, getHarvestLogs, getWeatherRecords, Plant } from '@/lib/storage'
import StatCard from '@/components/StatCard'
import PlantCard from '@/components/PlantCard'

export default function Dashboard() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [totalWaterings, setTotalWaterings] = useState(0)
  const [totalHarvests, setTotalHarvests] = useState(0)
  const [weatherRecords, setWeatherRecords] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load all data from localStorage
    const plantsData = getPlants()
    setPlants(plantsData)
    setTotalWaterings(getWateringLogs().length)
    setTotalHarvests(getHarvestLogs().length)
    setWeatherRecords(getWeatherRecords().length)
    setLoading(false)
  }, [])

  const healthyPlants = plants.filter(p => p.healthStatus === 'healthy').length
  const plantsNeedingAttention = plants.filter(p => p.healthStatus !== 'healthy').length

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading farm data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-primary">Bell Pepper Farm Tracker</h1>
              <p className="text-neutral-700 mt-2">Monitor your crops and optimize yields</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/plants/new" className="btn-primary">
                Add Plant
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Plants" value={plants.length} />
          <StatCard label="Healthy Plants" value={healthyPlants} highlight="success" />
          <StatCard label="Needs Attention" value={plantsNeedingAttention} highlight={plantsNeedingAttention > 0 ? 'warning' : 'success'} />
          <StatCard label="Water Logs" value={totalWaterings} />
        </div>

        {/* Quick Stats Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Fertilizer Logs" value={totalHarvests} />
          <StatCard label="Harvest Records" value={totalHarvests} />
          <StatCard label="Weather Records" value={weatherRecords} />
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link href="/plants" className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-primary mb-2">Plant Health</h3>
            <p className="text-neutral-700 text-sm">Track plant growth, height, leaves, and fruits</p>
          </Link>
          <Link href="/watering" className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-primary mb-2">Watering Log</h3>
            <p className="text-neutral-700 text-sm">Record irrigation and soil moisture levels</p>
          </Link>
          <Link href="/fertilizer" className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-primary mb-2">Fertilizer Tracking</h3>
            <p className="text-neutral-700 text-sm">Monitor nutrient applications and schedules</p>
          </Link>
          <Link href="/harvest" className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-primary mb-2">Harvest Records</h3>
            <p className="text-neutral-700 text-sm">Log yields, quantities, and quality metrics</p>
          </Link>
          <Link href="/weather" className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-primary mb-2">Weather Tracking</h3>
            <p className="text-neutral-700 text-sm">Record temperature, humidity, and rainfall</p>
          </Link>
          <Link href="/reports" className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-primary mb-2">Reports & Analytics</h3>
            <p className="text-neutral-700 text-sm">View yield trends and farm performance</p>
          </Link>
        </div>

        {/* Plants Overview */}
        {plants.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="text-primary">Your Plants</h2>
              <p className="text-neutral-700 text-sm mt-1">Overview of all monitored bell pepper plants</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plants.slice(0, 6).map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
            {plants.length > 6 && (
              <div className="mt-4 text-center">
                <Link href="/plants" className="btn-secondary">
                  View All Plants
                </Link>
              </div>
            )}
          </section>
        )}

        {plants.length === 0 && (
          <section className="card text-center py-12">
            <h3 className="text-lg font-semibold text-neutral-700 mb-2">No plants yet</h3>
            <p className="text-neutral-700 mb-4">Start by adding your first bell pepper plant</p>
            <Link href="/plants/new" className="btn-primary">
              Add Your First Plant
            </Link>
          </section>
        )}
      </main>
    </div>
  )
}
