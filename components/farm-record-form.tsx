'use client';

import React, { useState } from 'react';
import { FarmRecord, saveFarmRecord, generateId } from '@/lib/farm-data';
import { Save, X } from 'lucide-react';

interface FarmRecordFormProps {
  onSave: (record: FarmRecord) => void;
  onCancel: () => void;
  initialRecord?: Partial<FarmRecord>;
}

export default function FarmRecordForm({ onSave, onCancel, initialRecord }: FarmRecordFormProps) {
  const [formData, setFormData] = useState<Partial<FarmRecord>>({
    id: initialRecord?.id || generateId(),
    date: initialRecord?.date || new Date().toISOString().split('T')[0],
    temperature: initialRecord?.temperature || 0,
    humidity: initialRecord?.humidity || 0,
    windSpeed: initialRecord?.windSpeed || 0,
    rainfall: initialRecord?.rainfall || 0,
    soilMoisture: initialRecord?.soilMoisture || 0,
    plantHeight: initialRecord?.plantHeight || 0,
    leafCondition: initialRecord?.leafCondition || 'good',
    diseaseObserved: initialRecord?.diseaseObserved || '',
    pestObserved: initialRecord?.pestObserved || '',
    fertilizationApplied: initialRecord?.fertilizationApplied || false,
    fertilizationType: initialRecord?.fertilizationType || '',
    wateringDone: initialRecord?.wateringDone || false,
    wateringHours: initialRecord?.wateringHours || 0,
    yieldEstimate: initialRecord?.yieldEstimate || 0,
    notes: initialRecord?.notes || '',
    cloudSynced: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const inputElement = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? inputElement.checked : type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record: FarmRecord = {
      id: formData.id || generateId(),
      date: formData.date || new Date().toISOString().split('T')[0],
      temperature: formData.temperature || 0,
      humidity: formData.humidity || 0,
      windSpeed: formData.windSpeed || 0,
      rainfall: formData.rainfall || 0,
      soilMoisture: formData.soilMoisture || 0,
      plantHeight: formData.plantHeight || 0,
      leafCondition: (formData.leafCondition as any) || 'good',
      diseaseObserved: formData.diseaseObserved || '',
      pestObserved: formData.pestObserved || '',
      fertilizationApplied: formData.fertilizationApplied || false,
      fertilizationType: formData.fertilizationType || '',
      wateringDone: formData.wateringDone || false,
      wateringHours: formData.wateringHours || 0,
      yieldEstimate: formData.yieldEstimate || 0,
      notes: formData.notes || '',
      cloudSynced: false,
    };
    
    saveFarmRecord(record);
    onSave(record);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Add Farm Record</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date and Basic Weather */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
              <input
                type="number"
                name="temperature"
                step="0.1"
                value={formData.temperature}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Weather Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Humidity (%)</label>
              <input
                type="number"
                name="humidity"
                min="0"
                max="100"
                value={formData.humidity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wind Speed (km/h)</label>
              <input
                type="number"
                name="windSpeed"
                step="0.1"
                value={formData.windSpeed}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall (mm)</label>
              <input
                type="number"
                name="rainfall"
                step="0.1"
                value={formData.rainfall}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Soil & Plant */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soil Moisture (%)</label>
              <input
                type="number"
                name="soilMoisture"
                min="0"
                max="100"
                value={formData.soilMoisture}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plant Height (cm)</label>
              <input
                type="number"
                name="plantHeight"
                step="0.5"
                value={formData.plantHeight}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leaf Condition</label>
              <select
                name="leafCondition"
                value={formData.leafCondition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>

          {/* Disease & Pest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disease Observed</label>
              <input
                type="text"
                name="diseaseObserved"
                placeholder="e.g., Leaf spot, Blight"
                value={formData.diseaseObserved}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pest Observed</label>
              <input
                type="text"
                name="pestObserved"
                placeholder="e.g., Whitefly, Aphid"
                value={formData.pestObserved}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Maintenance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="fertilizationApplied"
                  checked={formData.fertilizationApplied}
                  onChange={handleChange}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Fertilization Applied</span>
              </label>
              {formData.fertilizationApplied && (
                <input
                  type="text"
                  name="fertilizationType"
                  placeholder="e.g., NPK 10-10-10"
                  value={formData.fertilizationType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="wateringDone"
                  checked={formData.wateringDone}
                  onChange={handleChange}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Watering Done</span>
              </label>
              {formData.wateringDone && (
                <input
                  type="number"
                  name="wateringHours"
                  placeholder="Hours"
                  step="0.5"
                  value={formData.wateringHours}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>
          </div>

          {/* Yield Estimate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Yield Estimate (kg)</label>
            <input
              type="number"
              name="yieldEstimate"
              step="0.5"
              value={formData.yieldEstimate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional observations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end border-t pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
