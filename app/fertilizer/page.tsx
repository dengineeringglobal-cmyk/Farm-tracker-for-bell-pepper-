'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFertilizerLogs, addFertilizerLog, getPlants, Plant } from '@/lib/storage'

export default function FertilizerPage() {
  const router = useRouter()
  const [plants, setPlants] = useState<Plant[]>([])
  const [logs, setLogs] = useState<any[]>([])
  const [formData, setFormData] = useState({
    plantId: '',
    date: new Date().toISOString().split('T')[0],
    type: 'NPK',
    amount: 10,
    notes: '',
  })

  useEffect(() => {
    setPlants(getPlants())
    setLogs(getFertilizerLogs())
    if (getPlants().length > 0) {
      setFormData(prev => ({ ...prev, plantId: getPlants()[0].id }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addFertilizerLog(formData)
    setFormData(prev => ({
      ...prev,
      date: new Date().toISOString().split('T')[0],
      type: 'NPK',
      amount: 10,
      notes: '',
    }))
    setLogs(getFertilizerLogs())
  }

  const getPlantName = (plantId: string) => {
    return plants.find(p => p.id === plantId)?.name || 'Unknown Plant'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="text-primary hover:text-primary-light mb-2 inline-block text-sm">
            ← Back to Dashboard
          </Link>
          <h1 className="text-primary">Fertilizer & Nutrient Tracking</h1>
          <p className="text-neutral-700 mt-2">Monitor nutrient applications and schedules</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {plants.length === 0 ? (
          <div className="card text-center py-12">
            <h3 className="text-lg font-semibold text-neutral-700 mb-2">No plants yet</h3>
            <p className="text-neutral-700 mb-4">Add a plant first to log fertilizer applications</p>
            <Link href="/plants/new" className="btn-primary">
              Add Your First Plant
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-1">
              <form onSubmit={handleSubmit} className="card">
                <h3 className="font-semibold text-foreground mb-4">Log Fertilizer</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Plant *</label>
                    <select name="plantId" value={formData.plantId} onChange={handleChange} className="input-field w-full">
                      {plants.map(plant => (
                        <option key={plant.id} value={plant.id}>
                          {plant.name}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    <label className="block text-sm font-medium text-foreground mb-2">Fertilizer Type *</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="input-field w-full">
                      <option value="NPK">NPK (Balanced)</option>
                      <option value="Nitrogen">Nitrogen</option>
                      <option value="Phosphorus">Phosphorus</option>
                      <option value="Potassium">Potassium</option>
                      <option value="Micronutrients">Micronutrients</option>
                      <option value="Organic">Organic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Amount (grams) *</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      step="5"
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="input-field w-full"
                      rows={3}
                      placeholder="Any observations..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Log Fertilizer
                  </button>
                </div>
              </form>
            </div>

            {/* Logs List */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Fertilizer History</h3>
              {logs.length > 0 ? (
                <div className="space-y-3">
                  {logs
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 20)
                    .map(log => (
                      <div key={log.id} className="card">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-foreground">{getPlantName(log.plantId)}</p>
                            <p className="text-sm text-neutral-700">{log.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">{log.type}</p>
                            <p className="text-sm text-neutral-700">{log.amount}g</p>
                          </div>
                        </div>
                        {log.notes && <p className="text-sm text-neutral-700 mt-2 border-t pt-2">{log.notes}</p>}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="card text-center py-8">
                  <p className="text-neutral-700">No fertilizer logs yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
