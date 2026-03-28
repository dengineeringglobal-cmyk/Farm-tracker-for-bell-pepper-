// Local storage utility for farm data persistence

export interface Plant {
  id: string
  name: string
  variety: string
  plantDate: string
  height: number // in cm
  leafCount: number
  fruitCount: number
  healthStatus: 'healthy' | 'warning' | 'critical'
  notes: string
  lastUpdated: string
}

export interface WateringLog {
  id: string
  plantId: string
  date: string
  amount: number // in liters
  soilMoisture: number // percentage
  notes: string
}

export interface FertilizerLog {
  id: string
  plantId: string
  date: string
  type: string // e.g., NPK, Potassium
  amount: number // in grams
  notes: string
}

export interface HarvestLog {
  id: string
  plantId: string
  date: string
  quantity: number // number of fruits
  weight: number // in kg
  quality: 'excellent' | 'good' | 'fair'
  notes: string
}

export interface WeatherRecord {
  id: string
  date: string
  temperature: number // celsius
  humidity: number // percentage
  rainfall: number // mm
  windSpeed: number // km/h
}

// Storage keys
const STORAGE_KEYS = {
  PLANTS: 'farm_plants',
  WATERING: 'farm_watering_logs',
  FERTILIZER: 'farm_fertilizer_logs',
  HARVEST: 'farm_harvest_logs',
  WEATHER: 'farm_weather_records',
}

// Generic storage functions
function getItem<T>(key: string, defaultValue: T[]): T[] {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

function setItem<T>(key: string, value: T[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to save to localStorage:`, error)
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Plants
export function getPlants(): Plant[] {
  return getItem<Plant>(STORAGE_KEYS.PLANTS, [])
}

export function addPlant(plant: Omit<Plant, 'id' | 'lastUpdated'>): Plant {
  const newPlant: Plant = {
    ...plant,
    id: generateId(),
    lastUpdated: new Date().toISOString(),
  }
  const plants = getPlants()
  plants.push(newPlant)
  setItem(STORAGE_KEYS.PLANTS, plants)
  return newPlant
}

export function updatePlant(id: string, updates: Partial<Plant>): void {
  const plants = getPlants()
  const index = plants.findIndex(p => p.id === id)
  if (index !== -1) {
    plants[index] = {
      ...plants[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    }
    setItem(STORAGE_KEYS.PLANTS, plants)
  }
}

export function deletePlant(id: string): void {
  const plants = getPlants().filter(p => p.id !== id)
  setItem(STORAGE_KEYS.PLANTS, plants)
}

// Watering Logs
export function getWateringLogs(): WateringLog[] {
  return getItem<WateringLog>(STORAGE_KEYS.WATERING, [])
}

export function addWateringLog(log: Omit<WateringLog, 'id'>): WateringLog {
  const newLog: WateringLog = {
    ...log,
    id: generateId(),
  }
  const logs = getWateringLogs()
  logs.push(newLog)
  setItem(STORAGE_KEYS.WATERING, logs)
  return newLog
}

export function getWateringLogsByPlant(plantId: string): WateringLog[] {
  return getWateringLogs().filter(log => log.plantId === plantId)
}

// Fertilizer Logs
export function getFertilizerLogs(): FertilizerLog[] {
  return getItem<FertilizerLog>(STORAGE_KEYS.FERTILIZER, [])
}

export function addFertilizerLog(log: Omit<FertilizerLog, 'id'>): FertilizerLog {
  const newLog: FertilizerLog = {
    ...log,
    id: generateId(),
  }
  const logs = getFertilizerLogs()
  logs.push(newLog)
  setItem(STORAGE_KEYS.FERTILIZER, logs)
  return newLog
}

export function getFertilizerLogsByPlant(plantId: string): FertilizerLog[] {
  return getFertilizerLogs().filter(log => log.plantId === plantId)
}

// Harvest Logs
export function getHarvestLogs(): HarvestLog[] {
  return getItem<HarvestLog>(STORAGE_KEYS.HARVEST, [])
}

export function addHarvestLog(log: Omit<HarvestLog, 'id'>): HarvestLog {
  const newLog: HarvestLog = {
    ...log,
    id: generateId(),
  }
  const logs = getHarvestLogs()
  logs.push(newLog)
  setItem(STORAGE_KEYS.HARVEST, logs)
  return newLog
}

export function getHarvestLogsByPlant(plantId: string): HarvestLog[] {
  return getHarvestLogs().filter(log => log.plantId === plantId)
}

// Weather Records
export function getWeatherRecords(): WeatherRecord[] {
  return getItem<WeatherRecord>(STORAGE_KEYS.WEATHER, [])
}

export function addWeatherRecord(record: Omit<WeatherRecord, 'id'>): WeatherRecord {
  const newRecord: WeatherRecord = {
    ...record,
    id: generateId(),
  }
  const records = getWeatherRecords()
  records.push(newRecord)
  setItem(STORAGE_KEYS.WEATHER, records)
  return newRecord
}

export function getWeatherRecordsByDateRange(startDate: string, endDate: string): WeatherRecord[] {
  return getWeatherRecords().filter(record => {
    const recordDate = new Date(record.date).getTime()
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    return recordDate >= start && recordDate <= end
  })
}
