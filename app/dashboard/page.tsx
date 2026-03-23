import WeatherDashboard from '@/components/weather-dashboard'

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Farm Dashboard</h1>
        <WeatherDashboard />
      </div>
    </main>
  )
}
