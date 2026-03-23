// Farm Data Management Library
// Handles local and cloud storage for farm records

export interface FarmRecord {
  id: string;
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  soilMoisture: number;
  plantHeight: number;
  leafCondition: 'excellent' | 'good' | 'fair' | 'poor';
  diseaseObserved: string;
  pestObserved: string;
  fertilizationApplied: boolean;
  fertilizationType?: string;
  wateringDone: boolean;
  wateringHours?: number;
  yieldEstimate?: number;
  notes: string;
  cloudSynced: boolean;
  syncTimestamp?: string;
}

export interface FarmStats {
  totalRecords: number;
  averageTemp: number;
  averageHumidity: number;
  plantHealthScore: number;
  lastRecordDate: string;
}

const STORAGE_KEY = 'farm_records_v1';
const CLOUD_STORAGE_KEY = 'farm_cloud_sync';

// Local Storage Functions
export const getFarmRecords = (): FarmRecord[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveFarmRecord = (record: FarmRecord): void => {
  if (typeof window === 'undefined') return;
  const records = getFarmRecords();
  const existingIndex = records.findIndex(r => r.id === record.id);
  
  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    records.push(record);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const deleteFarmRecord = (id: string): void => {
  if (typeof window === 'undefined') return;
  const records = getFarmRecords().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const calculateFarmStats = (): FarmStats => {
  const records = getFarmRecords();
  
  if (records.length === 0) {
    return {
      totalRecords: 0,
      averageTemp: 0,
      averageHumidity: 0,
      plantHealthScore: 0,
      lastRecordDate: 'N/A'
    };
  }

  const avgTemp = records.reduce((sum, r) => sum + r.temperature, 0) / records.length;
  const avgHumidity = records.reduce((sum, r) => sum + r.humidity, 0) / records.length;
  
  const healthScores: Record<string, number> = {
    'excellent': 100,
    'good': 75,
    'fair': 50,
    'poor': 25
  };
  
  const avgHealthScore = records.reduce((sum, r) => sum + healthScores[r.leafCondition], 0) / records.length;
  const lastRecord = records[records.length - 1];

  return {
    totalRecords: records.length,
    averageTemp: Math.round(avgTemp * 10) / 10,
    averageHumidity: Math.round(avgHumidity),
    plantHealthScore: Math.round(avgHealthScore),
    lastRecordDate: lastRecord?.date || 'N/A'
  };
};

// Cloud Storage Functions
export const getCloudSyncStatus = () => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(CLOUD_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const updateCloudSyncStatus = (status: any): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(status));
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createEmptyRecord = (): Partial<FarmRecord> => {
  return {
    id: generateId(),
    date: new Date().toISOString().split('T')[0],
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    rainfall: 0,
    soilMoisture: 0,
    plantHeight: 0,
    leafCondition: 'good',
    diseaseObserved: '',
    pestObserved: '',
    fertilizationApplied: false,
    wateringDone: false,
    notes: '',
    cloudSynced: false
  };
};
