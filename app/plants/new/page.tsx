'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { addPlant } from '@/lib/storage'

export default function NewPlantPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    plantDate: new Date().toISOString().split('T')[0],
    height: 0,
    leafCount: 0,
    fruitCount: 0,
    healthStatus: 'healthy' as const,
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Count') || name === 'height' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addPlant(formData)
    router.push('/plants')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/plants" className="text-primary hover:text-primary-light mb-2 inline-block text-sm">
            ← Back to Plants
          </Link>
          <h1 className="text-primary">Add New Plant</h1>
          <p className="text-neutral-700 mt-2">Register a new bell pepper plant to track</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Plant Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="e.g., Plant A, Pepper 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Variety *</label>
                <input
                  type="text"
                  name="variety"
                  value={formData.variety}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="e.g., California Wonder"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Plant Date *</label>
                <input
                  type="date"
                  name="plantDate"
                  value={formData.plantDate}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Initial Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Leaf Count</label>
                <input
                  type="number"
                  name="leafCount"
                  value={formData.leafCount}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Fruit Count</label>
                <input
                  type="number"
                  name="fruitCount"
                  value={formData.fruitCount}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Health Status</label>
                <select name="healthStatus" value={formData.healthStatus} onChange={handleChange} className="input-field w-full">
                  <option value="healthy">Healthy</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input-field w-full"
                rows={4}
                placeholder="Add any additional notes about this plant..."
              />
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button type="submit" className="btn-primary">
                Save Plant
              </button>
              <Link href="/plants" className="btn-secondary">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
