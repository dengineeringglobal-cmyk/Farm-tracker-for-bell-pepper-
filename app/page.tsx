import { Cloud, TrendingUp, Database } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-green-600">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <Cloud className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Farm Tracker</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Monitor and manage your bell pepper farm with real-time weather data
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white border border-white border-opacity-20">
              <Cloud className="w-8 h-8 mx-auto mb-3 text-blue-100" />
              <h3 className="font-semibold mb-2">Weather Tracking</h3>
              <p className="text-sm text-blue-100">Real-time weather data for your farm location</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white border border-white border-opacity-20">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-blue-100" />
              <h3 className="font-semibold mb-2">Farm Analytics</h3>
              <p className="text-sm text-blue-100">Track growth and performance metrics</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white border border-white border-opacity-20">
              <Database className="w-8 h-8 mx-auto mb-3 text-blue-100" />
              <h3 className="font-semibold mb-2">Cloud Storage</h3>
              <p className="text-sm text-blue-100">Save and sync your farm data</p>
            </div>
          </div>
          
          <a 
            href="/dashboard" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </main>
  )
}
