import WeatherDashboard from '@/components/weather-dashboard'

export const metadata = {
  title: 'Dashboard - Farm Tracker',
  description: 'View weather and farm data',
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Farm Dashboard</h1>
          <p className="text-gray-600">Monitor your bell pepper farm with real-time weather data</p>
        </div>
        
        <div className="grid gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <WeatherDashboard />
          </div>
        </div>
      </div>
    </main>
  )
}
