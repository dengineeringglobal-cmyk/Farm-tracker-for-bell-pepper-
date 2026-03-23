import WeatherDashboard from '@/components/weather-dashboard'
import AuthGuard from '@/components/auth-guard'
import Link from 'next/link'
import { Database, Cloud } from 'lucide-react'

export const metadata = {
  title: 'Dashboard - Farm Tracker',
  description: 'View weather and farm data',
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Farm Dashboard</h1>
            <p className="text-gray-600">Monitor your bell pepper farm with real-time weather data</p>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link href="/records" className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <Database className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg">Farm Records</h3>
                  <p className="text-green-100 text-sm">Add and manage farm data</p>
                </div>
              </div>
            </Link>
            <Link href="/data" className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <Cloud className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg">Data Management</h3>
                  <p className="text-purple-100 text-sm">Export and sync data</p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="grid gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <WeatherDashboard />
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  )
}
