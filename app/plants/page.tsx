'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPlants, Plant, deletePlant } from '@/lib/storage'
import PlantCard from '@/components/PlantCard'

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPlants(getPlants())
    setLoading(false)
  }, [])

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this plant?')) {
      deletePlant(id)
      setPlants(getPlants())
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-primary hover:text-primary-light mb-2 inline-block text-sm">
                ← Back to Dashboard
              </Link>
              <h1 className="text-primary">Plant Health Tracking</h1>
              <p className="text-neutral-700 mt-2">Monitor growth, height, leaves, and fruit development</p>
            </div>
            <Link href="/plants/new" className="btn-primary">
              Add Plant
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {plants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plants.map(plant => (
              <div key={plant.id} className="relative">
                <PlantCard plant={plant} />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link href={`/plants/${plant.id}/edit`} className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary-light">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(plant.id)}
                    className="text-xs bg-danger text-white px-2 py-1 rounded hover:bg-danger-light"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <h3 className="text-lg font-semibold text-neutral-700 mb-2">No plants yet</h3>
            <p className="text-neutral-700 mb-4">Start by adding your first bell pepper plant</p>
            <Link href="/plants/new" className="btn-primary">
              Add Your First Plant
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
