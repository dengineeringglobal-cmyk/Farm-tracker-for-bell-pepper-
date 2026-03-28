import Link from 'next/link'
import { Plant } from '@/lib/storage'

interface PlantCardProps {
  plant: Plant
}

export default function PlantCard({ plant }: PlantCardProps) {
  const statusColor = {
    healthy: 'text-success',
    warning: 'text-warning',
    critical: 'text-danger',
  }[plant.healthStatus]

  const statusBg = {
    healthy: 'bg-green-50',
    warning: 'bg-yellow-50',
    critical: 'bg-red-50',
  }[plant.healthStatus]

  return (
    <Link href={`/plants/${plant.id}`}>
      <div className={`card cursor-pointer hover:shadow-md transition-shadow ${statusBg}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">{plant.name}</h3>
            <p className="text-sm text-neutral-700">{plant.variety}</p>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}>
            {plant.healthStatus}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
          <div>
            <p className="text-neutral-700 text-xs">Height</p>
            <p className="font-semibold text-foreground">{plant.height}cm</p>
          </div>
          <div>
            <p className="text-neutral-700 text-xs">Leaves</p>
            <p className="font-semibold text-foreground">{plant.leafCount}</p>
          </div>
          <div>
            <p className="text-neutral-700 text-xs">Fruits</p>
            <p className="font-semibold text-foreground">{plant.fruitCount}</p>
          </div>
        </div>

        {plant.notes && (
          <p className="text-xs text-neutral-700 border-t pt-3">{plant.notes.substring(0, 60)}...</p>
        )}
      </div>
    </Link>
  )
}
