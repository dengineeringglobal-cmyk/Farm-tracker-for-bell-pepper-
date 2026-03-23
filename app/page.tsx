export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Farm Tracker</h1>
        <p className="text-xl text-gray-600 mb-8">Track your bell pepper farm</p>
        <a 
          href="/dashboard" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Dashboard
        </a>
      </div>
    </main>
  )
}
